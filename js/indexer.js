const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const PAGES_DIR = path.join(__dirname, "../pages");
const OUTPUT_FILE = path.join(__dirname, "../data/index.json");

// Lista de arquivos e módulos perfeitamente alinhada com o CCNA 2 (SRWE)
const modules = [
  { file: "modulo_1.html", module: "Módulo 1" },
  { file: "modulo_2.html", module: "Módulo 2" },
  { file: "modulo_3.html", module: "Módulo 3" },
  { file: "modulo_4.html", module: "Módulo 4" },
  {
    file: "exame_checkpoint_switching_vlan.html",
    module: "Checkpoint Switching/VLAN",
  },
  { file: "modulo_5.html", module: "Módulo 5" },
  { file: "modulo_6.html", module: "Módulo 6" },
  {
    file: "exame_checkpoint_redes_redundantes.html",
    module: "Checkpoint Redes Redundantes",
  },
  { file: "modulo_7.html", module: "Módulo 7" },
  { file: "modulo_8.html", module: "Módulo 8" },
  { file: "modulo_9.html", module: "Módulo 9" },
  {
    file: "exame_checkpoint_redes_disponiveis.html",
    module: "Checkpoint Redes Disponíveis",
  },
  { file: "modulo_11.html", module: "Módulo 11" },
  { file: "modulo_12.html", module: "Módulo 12" },
  { file: "modulo_13.html", module: "Módulo 13" },
  {
    file: "exame_checkpoint_seguranca_l2_wlans.html",
    module: "Checkpoint Segurança L2/WLAN",
  },
  { file: "modulo_14.html", module: "Módulo 14" },
  { file: "modulo_15.html", module: "Módulo 15" },
  { file: "modulo_16.html", module: "Módulo 16" },
  {
    file: "exame_checkpoint_conceitos_roteamento.html",
    module: "Checkpoint Roteamento",
  },
  {
    file: "itn_practice_packet_tracer_assessment.html",
    module: "Laboratório ITN",
  },
  {
    file: "srwe_practice_packet_tracer_part1.html",
    module: "Laboratório SRWE Part 1",
  },
  {
    file: "srwe_practice_packet_tracer_part2.html",
    module: "Laboratório SRWE Part 2",
  },
  { file: "exame_final_pratica_srwe.html", module: "Exame Final Prático" },
  { file: "pesquisa_fim_do_curso.html", module: "Pesquisa Fim do Curso" },
  { file: "exame_final_curso_srwe.html", module: "Exame Final Teórico" },
  {
    file: "srwe_final_packet_tracer_assessment.html",
    module: "Laboratório SRWE Final",
  },
  {
    file: "ccna_200-301_exam_v1.1_supplemental.html",
    module: "Extra CCNA v1.1",
  },
];

const chunks = [];

function splitText(text, size = 500) {
  const result = [];

  for (let i = 0; i < text.length; i += size) {
    result.push(text.slice(i, i + size));
  }

  return result;
}

console.log("📡 Iniciando indexação do CCNA 2 (SRWE)...\n");

for (const mod of modules) {
  const filePath = path.join(PAGES_DIR, mod.file);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Arquivo não encontrado: ${mod.file}`);
    continue;
  }

  console.log(`📖 Processando ${mod.file}`);

  const html = fs.readFileSync(filePath, "utf8");

  const $ = cheerio.load(html);

  $("script, style").remove();

  const text = $("body").text().replace(/\s+/g, " ").trim();

  const pieces = splitText(text);

  pieces.forEach((piece, index) => {
    chunks.push({
      id: `${mod.module}-${index}`,
      module: mod.module,
      content: piece,
    });
  });

  console.log(`   ${pieces.length} chunks gerados`);
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(chunks, null, 2), "utf8");

console.log("\n✅ Indexação do CCNA 2 concluída!");
console.log(`📦 ${chunks.length} chunks salvos`);
console.log(`💾 ${OUTPUT_FILE}`);
