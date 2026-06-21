📑 BRIEFING DE IDENTIDADE VISUAL E ESTRUTURA: CISCO CCNA 2 (SRWE)
📌 VISÃO GERAL

Este briefing define os padrões de design, cores, tipografia, efeitos e estrutura para a renderização de conteúdo técnico (topologias, sintaxes de comandos Cisco IOS, saídas de console e tabelas de endereçamento) em páginas web com a identidade visual voltada para o curso Cisco CCNA 2: Switching, Routing, and Wireless Essentials (SRWE).

O estilo é inspirado em sistemas operacionais de rede modernos, consoles de gerência Telnet/SSH e emuladores profissionais como Packet Tracer e SecureCRT em dark mode profissional, com ênfase máxima em legibilidade, comandos IOS destacados, fidelidade aos prompts CLI e elementos de infraestrutura interativos.
🎨 PALETA DE CORES (CSS Variables)
CSS

:root {
  --bg-dark: #0a0e17;          /* Fundo ultra-dark azulado de centrais de rede */
  --bg-card: #121824;          /* Fundo dos blocos de conteúdo e cartões */
  --bg-card-hover: #1b2436;    /* Efeito hover nos cartões */
  --text: #e2e8f0;             /* Texto principal (Alabaster Slate) */
  --text-dim: #718096;         /* Texto secundário desbotado */
  --primary: #00b4d8;          /* Azul Cisco Neon (Comandos IOS, prompts e links) */
  --primary-dark: #0077b6;     /* Azul profundo para variações de botões */
  --secondary: #00f5d4;        /* Ciano elétrico para gradientes e estados ativos */
  --success: #03f487;          /* Verde terminal para interfaces UP e logs de sucesso */
  --warning: #ffb703;          /* Laranja de atenção para portas STP em Blocking ou alertas */
  --danger: #ff4d6d;           /* Vermelho para portas Shutdown e falhas críticas */
  --info: #90e0ef;             /* Azul claro para informativos e notas teóricas */
  --border: #202b42;           /* Cor das bordas estruturais */
}

🔤 TIPOGRAFIA
Elemento	Fonte	Tamanho	Peso	Cor
Títulos principais (h1)	'Inter', sans-serif	3.5rem	800	Gradiente (--primary → --secondary)
Subtítulos (h2)	'Inter', sans-serif	2rem	700	--text + ícone --primary
Títulos de seção (h3)	'Inter', sans-serif	1.3rem	600	--text
Corpo do texto	'Inter', sans-serif	1rem	400	--text
Texto secundário	'Inter', sans-serif	0.85rem	400	--text-dim
Terminal / CLI IOS	'Consolas', 'Courier New', monospace	0.85rem	400	--text (Comandos em strong com --secondary ou --primary)
Efeito Gradiente para H1:
CSS

background: linear-gradient(90deg, var(--primary), var(--secondary));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

🧱 ESTRUTURA DE LAYOUT
Container:
CSS

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

Seções:
CSS

.section {
    padding: 60px 0;
    border-bottom: 1px solid var(--border);
    scroll-margin-top: 80px;
}

Título de Seção:
CSS

.section-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.section-title i {
    color: var(--primary);
    font-size: 2rem;
}
.section-number {
    color: var(--secondary);
    font-family: monospace;
    font-size: 1.8rem;
}

Cards:
CSS

.card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s;
    margin-bottom: 1.5rem;
}
.card:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    background: var(--bg-card-hover);
    box-shadow: 0 8px 24px rgba(0, 180, 216, 0.15);
}
.card i {
    font-size: 2rem;
    color: var(--primary);
    margin-bottom: 1rem;
}

💻 TERMINAL (Cisco CLI)
CSS

.terminal {
    background: #090d16;
    border-radius: 12px;
    padding: 1.2rem;
    border: 1px solid var(--border);
    font-family: 'Consolas', 'Courier New', monospace;
    overflow-x: auto;
    margin: 1.5rem 0;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.5);
}
.terminal pre {
    margin: 0;
    color: #e2e8f0;
    font-size: 0.85rem;
    white-space: pre;
    word-wrap: normal;
    display: inline-block;
    min-width: 100%;
    line-height: 1.5;
}
.terminal pre strong {
    color: var(--secondary); /* Comandos digitados pelo usuário ganham destaque ciano */
}

🧭 TOP BAR E MENU LATERAL (MODERNO)
Estrutura HTML do Top Bar e Sidebar:
HTML

<div class="top-bar">
    <button class="menu-toggle" id="openMenu">
        <i class="fas fa-network-wired"></i>
        <span>Console Menu</span>
    </button>
    <a href="index.html" class="top-bar-brand">
        <i class="fas fa-server"></i> Cisco CCNA 2 (SRWE)
    </a>
    <a href="index.html" class="btn-outline">
        <i class="fas fa-door-open"></i> Sair do Lab
    </a>
</div>

<div class="sidebar" id="sidebar">
    <div class="sidebar-header">
        <h3><i class="fas fa-map-marked-alt"></i> Módulos do Lab</h3>
        <button class="close-sidebar" id="closeMenu">
            <i class="fas fa-times"></i>
        </button>
    </div>
    <ul class="nav-modules">
        <li><a href="#secaoX-Y"><i class="fas fa-icone"></i> X.Y Título da Seção</a></li>
    </ul>
</div>

<div class="sidebar-overlay" id="sidebarOverlay"></div>

CSS do Top Bar e Sidebar:
CSS

/* Top Bar */
.top-bar {
  background: rgba(10, 14, 23, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  padding: 0.8rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-toggle {
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.menu-toggle:hover {
  background: var(--primary);
  color: var(--bg-dark);
}

.top-bar-brand {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 290px;
  background: rgba(18, 24, 36, 0.98);
  backdrop-filter: blur(15px);
  border-right: 1px solid var(--border);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1002;
  overflow-y: auto;
  padding: 1.5rem;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.close-sidebar {
  background: transparent;
  border: none;
  color: var(--text-dim);
  font-size: 1.5rem;
  cursor: pointer;
}

.close-sidebar:hover {
  color: var(--danger);
}

/* Sidebar nav modules */
.sidebar .nav-modules {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar .nav-modules li a {
  display: block;
  padding: 0.7rem 1rem;
  color: var(--text-dim);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 0.85rem;
}

.sidebar .nav-modules li a i {
  margin-right: 0.75rem;
  width: 20px;
  color: var(--primary);
}

.sidebar .nav-modules li a:hover {
  color: var(--secondary);
  background: rgba(0, 180, 216, 0.1);
  transform: translateX(5px);
}

/* Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1001;
  display: none;
}

.sidebar-overlay.active {
  display: block;
}

/* Ajuste do body para o header fixo */
body {
  padding-top: 65px;
}

JavaScript para o Menu Lateral (menu.js):
JavaScript

class SidebarMenu {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.overlay = document.getElementById('sidebarOverlay');
        this.openBtn = document.getElementById('openMenu');
        this.closeBtn = document.getElementById('closeMenu');
        this.init();
    }

    init() {
        if (!this.sidebar) return;

        if (this.openBtn) {
            this.openBtn.addEventListener('click', () => this.open());
        }
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidebar.classList.contains('open')) {
                this.close();
            }
        });

        const links = document.querySelectorAll('.sidebar .nav-modules a');
        links.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
    }

    open() {
        this.sidebar.classList.add('open');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.sidebar.classList.remove('open');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SidebarMenu();
});

🦸 HERO SECTION
CSS

.hero {
    padding: 80px 0;
    text-align: center;
    background: linear-gradient(135deg, #0a0e17 0%, #121c2e 100%);
    border-bottom: 1px solid var(--border);
}
.badge-lab {
    display: inline-block;
    background: rgba(0, 180, 216, 0.1);
    color: var(--primary);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(0, 180, 216, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
}

📊 TABELAS DE ENDEREÇAMENTO / VLANs
CSS

.table-custom {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
}
.table-custom th, .table-custom td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
}
.table-custom th {
    color: var(--primary);
    font-weight: 600;
    background: rgba(20, 30, 49, 0.5);
}
.table-custom tr:hover {
    background: rgba(255, 255, 255, 0.02);
}

⚠️ ALERTAS COM CONTEXTO DE REDE
CSS

.alert {
    padding: 1rem;
    border-radius: 12px;
    margin: 1rem 0;
    border-left: 4px solid;
    background: rgba(18, 24, 36, 0.6);
}
.alert-success { border-left-color: var(--success); } /* Syslogs operacionais / UP */
.alert-info { border-left-color: var(--info); }       /* Conceitos teóricos/RFCs */
.alert-warning { border-left-color: var(--warning); }   /* Inconsistências de VLAN/STP */
.alert-danger { border-left-color: var(--danger); }     /* Interfaces Down / Falhas */

📱 RESPONSIVIDADE
CSS

@media (max-width: 768px) {
    .hero h1 { font-size: 2rem; }
    .container { padding: 0 1rem; }
    .section { padding: 40px 0; }
    .section-title { font-size: 1.5rem; flex-wrap: wrap; }
    
    /* Top Bar Mobile */
    .top-bar { padding: 0.5rem 1rem; }
    .menu-toggle { padding: 0.3rem 0.6rem; font-size: 0.8rem; }
    .top-bar-brand { font-size: 0.9rem; }
    .btn-outline { padding: 0.3rem 0.6rem; font-size: 0.7rem; }
    body { padding-top: 55px; }
    
    /* Sidebar Mobile */
    .sidebar { width: 85%; max-width: 300px; }
    
    /* Terminal Mobile */
    .terminal { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .terminal pre { font-size: 0.7rem; white-space: pre; }
}

🛠️ ÍCONES FONTAWESOME RECOMENDADOS (MUNDO REDES)
Contexto	Ícone
Roteador / Switch / Infraestrutura	fa-server, fa-network-wired
Modo de Linha / Console / CLI	fa-terminal, fa-code
VLANs / Trunking / Divisão Lógica	fa-layer-group, fa-sitemap
Segurança de Porta / SSH / ACLs	fa-shield-alt, fa-key, fa-lock
Redundância / STP / EtherChannel	fa-layer-group, fa-link
Documentação / Protocolos / RFCs	fa-book, fa-file-alt
Interface UP / Sucesso	fa-check-circle, fa-toggle-on
Dicas / Insights de Troubleshooting	fa-lightbulb, fa-tools
Menu / Navegação Global	fa-bars, fa-compass
Links WAN / Wireless	fa-wifi, fa-broadcast-tower
📋 INSTRUÇÕES OBRIGATÓRIAS PARA RENDERIZAÇÃO

Ao processar o conteúdo técnico do material didático oficial do CCNA 2, siga à risca as seguintes diretrizes:

    TRADUÇÃO TÉCNICA: Traduza o conteúdo explicativo perfeitamente para PT-BR, mas preserve intactos os jargões universais de redes da Cisco em inglês, como: Subnet mask, Default Gateway, Trunk, Broadcast, Handshake, Native VLAN, Port-Security, Running-config, Startup-config, Bootloader, Spanning-Tree, Loopback.

    SUBSTITUIÇÃO DE MAPAS E IMAGENS: Nunca insira capturas de tela ou imagens estáticas. Substitua mapas topológicos complexos por representações visuais interativas em HTML estruturadas por CSS/Flexbox (assim como fizemos na seção 1.4.3).

    PROMPTS DINÂMICOS E FIÉIS À CLI: Preste atenção absoluta ao estado do prompt do Cisco IOS dentro dos blocos <div class="terminal">. Se o usuário executar um comando de alteração de contexto, as próximas linhas devem refletir rigorosamente o prompt correto do IOS:

        Modo EXEC Usuário: Router>

        Modo EXEC Privilegiado: Router#

        Modo de Configuração Global: Router(config)#

        Modo de Interface: Router(config-if)#

        Modo de Linha: Router(config-line)#

        Configuração de VLAN: Router(config-vlan)#

        Se o roteador for nomeado (ex: hostname S1 ou hostname R2), mude o prefixo imediatamente nas linhas seguintes para S1(config)# ou R2(config)#.

    COMANDOS EM NEGRITO: Dentro das tags <pre>, envolva todos os comandos que devem ser obrigatoriamente digitados pelo estudante dentro de <strong>...</strong> para que se destaquem em ciano elétrico. Deixe as respostas geradas automaticamente pelo roteador (saídas de syslogs ou comandos show) em texto plano normal (--text).

    ESTRUTURA DOS LINKS E SEÇÕES: Cada módulo ou subtópico deve ser encapsulado em uma tag <section> contendo um ID semântico estruturado como id="secao1-4-2", id="secao1-4-5", mapeando rigorosamente o sumário da Cisco.

ESTRUTURA PADRÃO DE UMA SEÇÃO:
HTML

<section id="secao1-X-Y" class="section">
    <h2 class="section-title">
        <i class="fas [icone-de-rede]"></i>
        <span class="section-number">1.X.Y</span> Título do Tópico em Redes
    </h2>
    <div class="card">
        <p>Explicação conceitual da arquitetura ou protocolo...</p>
    </div>
</section>

PADRÃO DE PÁGINA COMPLETO COMPATÍVEL COM CCNA 2:
HTML

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Cisco CCNA 2 (SRWE) | Laboratório Avançado</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* INSERIR OS ESTILOS CSS DO BRIEFING REVISADO AQUI */
    </style>
</head>
<body>

<div class="top-bar">...</div>

<div class="sidebar">...</div>
<div class="sidebar-overlay"></div>

<section class="hero">
    <div class="badge-lab">Cisco IOS Interactive Lab</div>
    <h1>Switching, Routing, and Wireless Essentials</h1>
</section>

<div class="container">
    </div>

<footer>...</footer>

<script src="menu.js"></script>
</body>
</html>

🚀 INÍCIO PARA NOVO CHAT (Prompt Pronto)

Copie e cole o texto abaixo se precisar iniciar uma nova sessão limpa focado na qualidade que atingimos:
Plaintext

🎨 Contexto: Você é um engenheiro de redes especialista em Front-End UI/UX corporativo e deve renderizar o conteúdo prático e teórico do curso oficial "Cisco CCNA 2 (SRWE)" seguindo as diretrizes exatas de design estabelecidas.

📌 Identidade Visual do Terminal de Redes:
- Fundo escuro azulado #0a0e17, cartões internos #121824, bordas tecnológicas #202b42.
- Texto principal #e2e8f0, subtextos técnicos #718096.
- Cor primária: azul ciano elétrico #00b4d8 (prompts, links e títulos).
- Cor secundária/Destaque de comandos digitados: #00f5d4.
- Logs operacionais de sucesso (Interface UP): #03f487.
- Efeito Hover nos cards: elevação suave + brilho de borda em azul.

🛠️ Regras Inegociáveis de Execução:
1. Traduza a teoria para PT-BR mantendo os termos universais de redes intactos (Trunk, VLAN, Spanning-Tree, etc.).
2. Substitua qualquer imagem ou diagrama por construções de topologias em código nativo HTML/CSS responsivo com rolagem horizontal.
3. Insira as linhas de comando rigorosamente dentro de <div class="terminal"><pre>...</pre></div> destacando o texto inserido pelo usuário com as tags <strong>...</strong>.
4. Mantenha os prompts de comando sincronizados e fiéis ao estado real do Cisco IOS (ex: Router#, Router(config)#, Router(config-if)#).
5. Gere de forma contígua os elementos da sidebar e do arquivo JavaScript correspondente para cada nova seção gerada.

📤 Envie o conteúdo do roteiro de laboratório/módulo para iniciar a renderização no padrão profissional...