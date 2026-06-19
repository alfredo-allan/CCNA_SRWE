class CCNA2Search {
  constructor() {
    // Lista de todos os módulos/páginas atualizada para o CCNA 2 (SRWE)
    this.pages = [
      {
        path: "pages/modulo_1.html",
        name: "Módulo 1",
        title: "Configuração básica de dispositivos",
      },
      {
        path: "pages/modulo_2.html",
        name: "Módulo 2",
        title: "Conceitos de switching",
      },
      { path: "pages/modulo_3.html", name: "Módulo 3", title: "VLANs" },
      {
        path: "pages/modulo_4.html",
        name: "Módulo 4",
        title: "Roteamento inter-VLANs",
      },
      {
        path: "pages/exame_checkpoint_switching_vlan.html",
        name: "Checkpoint",
        title: "Conceitos de comutação, VLANs e Roteamento Inter-VLAN",
      },
      {
        path: "pages/modulo_5.html",
        name: "Módulo 5",
        title: "Conceitos de STP",
      },
      { path: "pages/modulo_6.html", name: "Módulo 6", title: "EtherChannel" },
      {
        path: "pages/exame_checkpoint_redes_redundantes.html",
        name: "Checkpoint",
        title: "Exame de Redes Redundantes",
      },
      { path: "pages/modulo_7.html", name: "Módulo 7", title: "DHCPv4" },
      {
        path: "pages/modulo_8.html",
        name: "Módulo 8",
        title: "SLAAC e DHCPv6",
      },
      {
        path: "pages/modulo_9.html",
        name: "Módulo 9",
        title: "Conceitos de FHRP",
      },
      {
        path: "pages/exame_checkpoint_redes_disponiveis.html",
        name: "Checkpoint",
        title: "Exame de redes disponíveis e confiáveis",
      },
      {
        path: "pages/modulo_11.html",
        name: "Módulo 11",
        title: "Configuração de Segurança do Switch",
      },
      {
        path: "pages/modulo_12.html",
        name: "Módulo 12",
        title: "Conceitos de Redes sem Fio (WLAN)",
      },
      {
        path: "pages/modulo_13.html",
        name: "Módulo 13",
        title: "Configuração WLAN",
      },
      {
        path: "pages/exame_checkpoint_seguranca_l2_wlans.html",
        name: "Checkpoint",
        title: "Exame de segurança L2 e WLANs",
      },
      {
        path: "pages/modulo_14.html",
        name: "Módulo 14",
        title: "Conceitos de roteamento",
      },
      {
        path: "pages/modulo_15.html",
        name: "Módulo 15",
        title: "Roteamento estático de IP",
      },
      {
        path: "pages/modulo_16.html",
        name: "Módulo 16",
        title: "Solução de problemas de rotas estáticas e padrão",
      },
      {
        path: "pages/exame_checkpoint_conceitos_roteamento.html",
        name: "Checkpoint",
        title: "Exame de Conceitos de Roteamento e Configuração",
      },
      {
        path: "pages/itn_practice_packet_tracer_assessment.html",
        name: "Laboratório",
        title: "ITN Practice Packet Tracer Assessment",
      },
      {
        path: "pages/srwe_practice_packet_tracer_part1.html",
        name: "Laboratório",
        title: "SRWE Practice Packet Tracer Assessment - Part 1",
      },
      {
        path: "pages/srwe_practice_packet_tracer_part2.html",
        name: "Laboratório",
        title: "SRWE Practice Packet Tracer Assessment - Part 2",
      },
      {
        path: "pages/exame_final_pratica_srwe.html",
        name: "Exame Prático",
        title: "Exame Final da Prática SRWE",
      },
      {
        path: "pages/pesquisa_fim_do_curso.html",
        name: "Feedback",
        title: "Pesquisa de Fim do Curso",
      },
      {
        path: "pages/exame_final_curso_srwe.html",
        name: "Exame Final",
        title: "Exame Final do Curso SRWE",
      },
      {
        path: "pages/srwe_final_packet_tracer_assessment.html",
        name: "Laboratório",
        title: "SRWE Final Packet Tracer Assessment",
      },
      {
        path: "pages/ccna_200-301_exam_v1.1_supplemental.html",
        name: "Extra",
        title: "CCNA 200-301 Exam v1.1 Supplemental Module",
      },
    ];

    this.searchTimeout = null;
    this.init();
  }

  init() {
    const searchInput = document.getElementById("ndgGlobalSearch");
    const resultsDiv = document.getElementById("ndgSearchResults");
    const statsSpan = document.getElementById("searchStatsResults");
    const statusSpan = document.getElementById("searchStatus");
    const modulesCount = document.getElementById("searchModulesCount");

    if (!searchInput) {
      console.error("❌ Elemento 'ndgGlobalSearch' não encontrado!");
      return;
    }

    console.log("✅ Motor de busca CCNA 2 iniciado!");
    if (modulesCount) {
      modulesCount.textContent = this.pages.length + " módulos/atividades";
    }

    searchInput.addEventListener("input", (e) => {
      clearTimeout(this.searchTimeout);
      const term = e.target.value.trim();
      console.log(`🔍 Buscando por: "${term}"`);

      if (term.length < 2) {
        resultsDiv.innerHTML = "";
        statsSpan.textContent = "0";
        statusSpan.innerHTML =
          '<i class="fas fa-check-circle"></i> aguardando...';
        return;
      }

      resultsDiv.innerHTML =
        '<div class="cybersec-loading"><i class="fas fa-spinner fa-spin"></i> varrendo o currículo do CCNA 2...</div>';
      statusSpan.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> buscando...';

      this.searchTimeout = setTimeout(() => {
        this.performSearch(term);
      }, 500);
    });

    // Garante isolamento total no keypress
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();

        clearTimeout(this.searchTimeout);
        const term = e.target.value.trim();
        if (term.length >= 2) {
          this.performSearch(term);
        }
      }
    });
  }

  async performSearch(term) {
    const resultsDiv = document.getElementById("ndgSearchResults");
    const statsSpan = document.getElementById("searchStatsResults");
    const statusSpan = document.getElementById("searchStatus");

    const searchTerm = term.toLowerCase();
    let allResults = [];
    let modulesSearched = 0;

    console.log(`🚀 Iniciando busca por: "${searchTerm}"`);

    for (const page of this.pages) {
      try {
        console.log(`📄 Buscando em: ${page.path}`);
        const response = await fetch(page.path);

        if (!response.ok) {
          console.warn(
            `⚠️ Página não encontrada: ${page.path} - Status: ${response.status}`
          );
          modulesSearched++;
          continue;
        }

        const html = await response.text();
        console.log(`✅ Página carregada: ${page.path} (${html.length} bytes)`);

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const contentElements = doc.querySelectorAll(
          "section, .card, p, h1, h2, h3, h4, .section-title, .terminal pre, .alert, li, td"
        );

        console.log(
          `📑 Encontrados ${contentElements.length} elementos para buscar em ${page.path}`
        );

        contentElements.forEach((element) => {
          const text = element.textContent.trim();
          if (text.toLowerCase().includes(searchTerm)) {
            console.log(`🎯 Encontrado termo em ${page.path}`);
            const index = text.toLowerCase().indexOf(searchTerm);
            const start = Math.max(0, index - 40);
            const end = Math.min(text.length, index + searchTerm.length + 40);
            let snippet = text.substring(start, end);

            if (start > 0) snippet = "..." + snippet;
            if (end < text.length) snippet = snippet + "...";

            const regex = new RegExp(`(${searchTerm})`, "gi");
            snippet = snippet.replace(regex, "<mark>$1</mark>");

            let anchorId = element.id || element.closest("[id]")?.id || "";

            allResults.push({
              moduleName: page.name,
              moduleTitle: page.title,
              path: page.path + (anchorId ? "#" + anchorId : ""),
              snippet: snippet.substring(0, 250),
            });
          }
        });

        modulesSearched++;
        statusSpan.innerHTML = `<i class="fas fa-spinner fa-spin"></i> buscando... (${modulesSearched}/${this.pages.length})`;
      } catch (error) {
        console.error(`❌ Erro ao buscar ${page.path}:`, error);
        modulesSearched++;
      }
    }

    console.log(
      `📊 Busca concluída. Total de resultados: ${allResults.length}`
    );
    statsSpan.textContent = allResults.length;
    statusSpan.innerHTML = '<i class="fas fa-check-circle"></i> concluído';

    if (allResults.length === 0) {
      resultsDiv.innerHTML = `
        <div class="cybersec-no-results">
          <i class="fas fa-search"></i>
          <p>Nenhum resultado encontrado para "<strong>${term}</strong>"</p>
          <p style="font-size: 0.8rem; color: #666">Tente outros termos de redes: VLAN, OSPF, STP, DHCP, EtherChannel, FHRP, Port Security</p>
        </div>
      `;
      return;
    }

    let html = "";
    allResults.forEach((result) => {
      html += `
        <div class="cybersec-result-item" onclick="window.location.href='${result.path}'">
          <div>
            <span class="cybersec-result-module">${result.moduleName}</span>
            <span style="color: #888; font-size: 0.75rem; margin-left: 5px;">${result.moduleTitle}</span>
          </div>
          <div class="cybersec-result-snippet">${result.snippet}</div>
          <div class="cybersec-result-meta">
            <span><i class="fas fa-link"></i> Acessar item em ${result.moduleName}</span>
          </div>
        </div>
      `;
    });

    resultsDiv.innerHTML = html;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("📡 Cisco CCNA 2 (SRWE) - Motor de busca carregado!");
  new CCNA2Search();
});
