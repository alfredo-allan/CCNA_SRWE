const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "llama3.2:3b";

const INDEX_PATH = path.join(__dirname, "../data/index.json");
const CACHE_PATH = path.join(__dirname, "../data/cache.json");

let index = [];
let cache = {};

/* ============================================
   CARREGAR ÍNDICE CCNA 2
============================================ */
try {
  index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
  console.log(`📡 Índice CCNA 2 carregado: ${index.length} chunks`);
} catch (error) {
  console.warn("⚠️ Não foi possível carregar index.json para o CCNA 2");
}

/* ============================================
   CARREGAR CACHE
============================================ */
try {
  cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
  console.log(
    `⚡ Cache carregado: ${Object.keys(cache).length} perguntas cadastradas`
  );
} catch {
  console.log("⚡ Criando base cache.json limpa");
  cache = {};
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

/* ============================================
   EXPRESS MIDDLEWARES
============================================ */
app.use(cors());
app.use(express.json({ limit: "10mb" }));

/* ============================================
   HEALTH / DIAGNÓSTICO
============================================ */
app.get("/health", async (req, res) => {
  try {
    const response = await fetch("http://localhost:11434/api/tags");
    const data = await response.json();

    res.json({
      success: true,
      ollama: true,
      course: "Cisco CCNA 2 (SRWE)",
      model: MODEL,
      indexed_chunks: index.length,
      cached_answers: Object.keys(cache).length,
      models: data.models,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      ollama: false,
      error: error.message,
    });
  }
});

/* ============================================
   BUSCA LOCAL NO ÍNDICE DE REDES
============================================ */
function searchIndex(question) {
  const keywords = question
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  return index
    .map((chunk) => {
      let score = 0;
      const content = chunk.content.toLowerCase();

      keywords.forEach((keyword) => {
        const matches = content.split(keyword).length - 1;
        score += matches * 10;
      });

      return {
        ...chunk,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Retorna os 5 blocos de contexto mais relevantes
}

/* ============================================
   CHAT ENDPOINT (RAG WORKFLOW)
============================================ */
app.post("/api/chat", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Pergunta inválida ou vazia.",
      });
    }

    const normalizedQuestion = question.trim().toLowerCase();

    console.log(
      "\n==================== REQUISIÇÃO DE REDE ===================="
    );
    console.log(`Pergunta Aluno: ${normalizedQuestion}`);
    console.log("============================================================");

    /* ===== VERIFICAÇÃO DE CACHE ===== */
    if (cache[normalizedQuestion]) {
      console.log("⚡ Cache HIT (Resposta entregue instantaneamente)");
      return res.json({
        success: true,
        answer: cache[normalizedQuestion],
        source: "cache",
      });
    }

    /* ===== RAG - BUSCA DE CONTEXTO CISCO ===== */
    const results = searchIndex(normalizedQuestion);
    console.log(
      `🔎 Chunks de redes correspondentes encontrados: ${results.length}`
    );

    if (results.length === 0) {
      return res.json({
        success: true,
        answer:
          "O material oficial do curso Cisco CCNA 2: Switching, Routing, and Wireless Essentials não possui informações ou comandos suficientes para responder com precisão a essa pergunta.",
        source: "index",
      });
    }

    const context = results
      .map((chunk) => {
        return `[Unidade/Tópico: ${chunk.module}]\n${chunk.content}`;
      })
      .join("\n\n");

    /* ===== PROMPT REFINADO COM PERSONA CISCO NETACAD ===== */
    const prompt = `
Você é o Cisco NetAcad IA.
Tutor especialista certificado e focado estritamente no curso oficial Cisco CCNA 2: Switching, Routing, and Wireless Essentials (SRWE).

DIRETRIZES DE RESPOSTA (REGRAS CRÍTICAS):
- Baseie sua resposta EXCLUSIVAMENTE no contexto fornecido abaixo.
- Não use nenhum conhecimento externo que não esteja mapeado no contexto.
- Não invente parâmetros de comandos do Cisco IOS (ex: interfaces, vlan IDs) que não estejam descritos no contexto.
- Se o contexto não contiver dados suficientes para estruturar uma resposta completa, informe educadamente que o material do CCNA 2 não aborda o ponto específico.
- Responda em português brasileiro.
- Seja didático, técnico e objetivo (use blocos de código se o contexto fornecer sintaxe de comandos CLI da Cisco).

CONTEXTO EXTRAÍDO DA DOCUMENTAÇÃO:
${context}

PERGUNTA DO ESTUDANTE:
${question}

RESPOSTA DO CISCO NETACAD IA:
`;

    console.log("🧠 Consultando inteligência local (Ollama)...");

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 180000); // 3 minutos limite

    const ollamaResponse = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: MODEL,
        prompt,
        stream: false,
        options: {
          temperature: 0.1, // Mantém a resposta determinística e fiel ao material técnico
          num_predict: 400, // Ajustado ligeiramente para cima para permitir explicações de comandos IOS mais completas
        },
      }),
    });

    clearTimeout(timeout);
    const data = await ollamaResponse.json();

    if (!data.response) {
      throw new Error("O sistema do Ollama não devolveu uma resposta válida.");
    }

    const answer = data.response.trim();

    /* ===== PERSISTÊNCIA EM CACHE ===== */
    cache[normalizedQuestion] = answer;
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
    console.log("💾 Resposta catalogada em cache.json");

    res.json({
      success: true,
      answer,
      source: "ollama",
      metadata: {
        model: data.model,
        prompt_tokens: data.prompt_eval_count,
        response_tokens: data.eval_count,
      },
    });
  } catch (error) {
    console.error("❌ Erro no fluxo do Chat:", error);

    if (error.name === "AbortError") {
      return res.status(504).json({
        success: false,
        error:
          "Tempo limite esgotado ao tentar processar a consulta no modelo local.",
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* ============================================
   STARTUP DO SERVIDOR
============================================ */
app.listen(PORT, () => {
  console.log(`
📡 Cisco NetAcad IA - Servidor de RAG Iniciado

Acesso API  : http://localhost:${PORT}
Health-Check: http://localhost:${PORT}/health
Modelo LLM  : ${MODEL}
Endp. Ollama: ${OLLAMA_URL}

Elementos Indexados: ${index.length} chunks de rede.
Perguntas em Cache : ${Object.keys(cache).length} itens.

Pronto para auxiliar nos estudos de Switching, Routing, and Wireless Essentials!
`);
});
