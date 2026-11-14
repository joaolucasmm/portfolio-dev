// All copy on the page, in both languages. Components read `content[language]`.
// Work history follows the LinkedIn profile, which is the source of truth for dates and titles.

// The shape of the copy. Both languages are typed with it, so a text missing
// from one of them fails to compile, not only the test in content.test.ts.

/** A month as "YYYY-MM". */
export type Month = string;
/** From and to; a null end means the role is current. */
export type MonthRange = [from: Month, to: Month | null];
/** [label, value] pairs, read as a definition list. */
export type Pair = [label: string, value: string];
/** [title, line under it, extra words that find it] in the search. */
export type SearchAction = [title: string, sub: string, keywords: string];
export type Plural = [one: string, many: string];

export interface Project {
    name: string;
    /** Alt text of the screenshot. */
    shot: string;
    kind: string;
    description: string;
}

export interface Role {
    title: string;
    /** The tab label on phones. */
    short: string;
    place: string;
    dates: MonthRange;
    text: string;
    points?: string[];
    tools: string;
    link: string;
}

export interface Gap {
    dates: [from: Month, to: Month];
    text: string;
}

export interface Course {
    title: string;
    place: string;
    dates: string;
    city: string;
    note: string;
    link: string;
}

export interface Copy {
    nav: {
        work: string;
        experience: string;
        education: string;
        contact: string;
        language: string;
        languageShort: string;
        languageNow: string;
        theme: string;
        top: string;
        sections: string;
        menu: string;
        close: string;
        toTop: string;
        search: string;
        skip: string;
    };
    hero: { role: string; company: string; before: string; portrait: string; resume: string };
    about: {
        heading: string;
        lead: string;
        first: string;
        body: string[];
        facts: Pair[];
        stackHeading: string;
        stack: Pair[];
    };
    work: {
        heading: string;
        run: string;
        stop: string;
        site: string;
        code: string;
        download: string;
        post: string;
        frameTitle: string;
        windowsOnly: string;
        hint: string;
        next: string;
        previous: string;
        following: string;
        goTo: string;
        of: string;
        items: Project[];
    };
    experience: {
        locale: string;
        heading: string;
        company: string;
        tools: string;
        units: { year: Plural; month: Plural; and: string; now: string };
        betweenHeading: string;
        between: Gap[];
        items: Role[];
    };
    education: { heading: string; more: string; items: Course[] };
    contact: {
        form: string;
        resume: string;
        title: string;
        copy: { email: string; phone: string };
        copied: { email: string; phone: string };
    };
    search: {
        label: string;
        placeholder: string;
        enter: string;
        empty: string;
        goTo: string;
        shortcuts: { label: string; experience: string; work: string; linkedin: string; email: string };
        copied: string;
        keys: { choose: string; open: string; close: string };
        groups: { action: string; section: string; project: string; role: string; edu: string };
        actions: { theme: SearchAction; language: SearchAction; email: SearchAction; download: SearchAction };
    };
    footer: {
        sections: string;
        rights: string;
        top: string;
        morph: string;
        keys: { label: string; focus: string; jump: string; search: string; theme: string; debug: string };
    };
    dialog: {
        title: string;
        sub: string;
        name: string;
        subject: string;
        email: string;
        message: string;
        send: string;
        sending: string;
        sent: string;
        error: string;
        close: string;
    };
}

export type Language = "english" | "portuguese";

export interface ProjectLink {
    /** Live site; with `run`, it opens in the frame on the page. */
    url?: string;
    repo: string;
    download?: string;
    post?: string;
    run?: boolean;
    year: string;
}

const links = {
    email: "joaol_mm@hotmail.com",
    phone: "+55 48 99633-0209",
    phoneHref: "tel:+5548996330209",
    github: "https://github.com/joaolucasmm",
    linkedin: "https://www.linkedin.com/in/jo%C3%A3o-lucas-miranda-menegasso/",
};

// One entry per project, in the order of `work.items`.
// `run`: the live site can be opened inside the frame on the page.
const projectLinks: ProjectLink[] = [
    {
        repo: "https://github.com/joaolucasmm/sizewise",
        download: "https://github.com/joaolucasmm/sizewise/releases/latest",
        year: "2026",
    },
    {
        url: "https://joaolucasmm.github.io/QRcodeGen/",
        repo: "https://github.com/joaolucasmm/QRcodeGen/",
        post: "https://www.linkedin.com/feed/update/urn:li:activity:7316523182281187329/",
        run: true,
        year: "2025",
    },
    {
        url: "https://joaolucasmm.github.io/Pokedex/",
        repo: "https://github.com/joaolucasmm/Pokedex",
        run: true,
        year: "2022",
    },
];

const english: Copy = {
    nav: {
        work: "Projects",
        experience: "Experience",
        education: "Education",
        contact: "Contact",
        language: "Português",
        languageShort: "PT",
        languageNow: "Language: English. Switch to Português",
        theme: "Dark mode",
        top: "João Lucas, top of the page",
        sections: "Sections",
        menu: "JL, sections menu",
        close: "Close",
        toTop: "Home",
        search: "Search",
        skip: "Skip to content",
    },
    hero: {
        role: "mobile and front-end engineer",
        company: "at Nelogica",
        before: "On the Profit and Tryd apps traders use every day. Before that, support, QA and development at SAP.",
        portrait: "Portrait of João Lucas",
        resume: "Résumé (PDF)",
    },
    about: {
        heading: "About",
        lead: "I’m João Lucas Miranda Menegasso",
        first: ", and I have sat at every desk a bug passes: support, QA and development at SAP, and now mobile at Nelogica.",
        body: [
            "I build the mobile apps of Nelogica’s trading platforms and go below the interface when the problem asks for it, down to native Kotlin and Swift. Before software came a mechatronics diploma and physics engineering at UFRGS, where I learned to measure before I change anything.",
        ],
        facts: [
            ["Based in", "Porto Alegre, Brazil"],
            ["Now", "Software engineer, mobile, at Nelogica"],
            ["Speaks", "Português, English (fluent), Español (intermediate)"],
        ],
        stackHeading: "Stack",
        // [group, tools]
        stack: [
            ["Every day", "Vue.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, CapacitorJS"],
            ["Native", "Kotlin (Jetpack Compose), Java, Swift, Capacitor plugins"],
            ["Also", "React, SQL, Rust, Tauri, Node.js, SAP UI5, SAP CAP"],
            ["Testing and delivery", "Selenium WebDriver, Jest, GitHub Actions, GitLab, Git, OpenSearch"],
            ["Team", "Scrum, Figma, JIRA"],
        ],
    },
    work: {
        heading: "Projects",
        run: "Run it here",
        stop: "Show the picture",
        site: "Open the site",
        code: "Code on GitHub",
        download: "Download for Windows",
        post: "LinkedIn post",
        frameTitle: "Live project",
        windowsOnly: "Windows app. Download it from a PC.",
        hint: "Projects. Use the arrow keys to switch.",
        next: "Up next",
        previous: "Previous project",
        following: "Next project",
        goTo: "Show",
        of: "of",
        items: [
            {
                name: "Sizewise",
                shot: "Sizewise window after scanning drive C: totals for size, files and folders, and the largest folders with their share of the disk",
                kind: "Windows app, Rust + Tauri + Vue",
                description:
                    "Shows where your disk space goes without touching a file: a parallel Rust scanner, a virtualized folder tree and the 100 largest files. Tested core, releases built by GitHub Actions.",
            },
            {
                name: "QR Code Gen",
                shot: "QR Code Gen page: a content field, the Generate button and the QR code it made",
                kind: "QR generator, REST API",
                description:
                    "Type a link or a line of text and get its QR code back from a RESTful API, ready to save.",
            },
            {
                name: "Pokedex",
                shot: "Pokedex page drawn as a red Pokédex, showing 6 - Charizard, a name or number search field and Prev and Next buttons",
                kind: "REST API client",
                description:
                    "Search any Pokémon by name or number; the data comes live from a public RESTful API.",
            },
        ],
    },
    experience: {
        locale: "en",
        heading: "Experience",
        company: "About the company",
        tools: "Tools",
        units: { year: ["year", "years"], month: ["month", "months"], and: " ", now: "now" },
        betweenHeading: "Between roles",
        between: [
            { dates: ["2025-04", "2025-08"], text: "Between SAP and Nelogica: personal projects and the job search." },
            { dates: ["2020-08", "2023-02"], text: "Full-time studies in physics engineering at UFRGS." },
        ],
        items: [
            {
                title: "Software engineer, mobile",
                short: "Mobile",
                place: "Nelogica",
                dates: ["2025-09", null],
                text: "Hybrid Android and iOS apps (Vue + Capacitor) for Profit, Tryd and other Nelogica trading products, used by more than 100,000 people.",
                points: [
                    "Cut the cold start to the home screen from 16 s to about 1.2 s by moving bundle cleanup during updates to a worker thread, after native Kotlin and Swift plugins showed where the time went.",
                    "Built Cloud Automation into Profit Mobile from flow design to launch: traders run strategy bots on the server without the desktop app open.",
                    "Cut overall load time by about 35% with critical, deferred and lazy loading, dependency upgrades and GPU-friendly animations.",
                    "Rebuilt the navigation bar with an iOS Liquid Glass–style effect and gestures, with the UX team, and set up OpenSearch dashboards on product usage.",
                ],
                tools: "Vue.js, TypeScript, Tailwind CSS, CapacitorJS, Kotlin, Swift, OpenSearch, GitLab, Figma, Scrum",
                link: "https://www.nelogica.com.br/",
            },
            {
                title: "Rotation programme intern, software developer",
                short: "Developer",
                place: "SAP",
                dates: ["2024-08", "2025-03"],
                text: "SAP Intelligent Agriculture, a logistics management product for farms, in a Scrum team.",
                points: [
                    "Fixed bugs and maintained the logistics features, and documented the code for the team.",
                    "Brought the QA view into development, validating before every delivery.",
                ],
                tools: "TypeScript, CAP, UI5, Fiori Elements, Node.js, Scrum",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "Rotation programme intern, QA engineer",
                short: "QA engineer",
                place: "SAP",
                dates: ["2023-12", "2024-08"],
                text: "Test automation for the product’s delivery pipeline.",
                points: [
                    "Automated the end-to-end tests with Selenium WebDriver.",
                    "Built automatic test-data insertion, which ended recurring pipeline failures.",
                    "Wrote testing protocols that kept fixed problems from coming back to the deploy pipeline.",
                ],
                tools: "Selenium WebDriver, JavaScript, Git",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "Rotation programme intern, product support",
                short: "Support",
                place: "SAP",
                dates: ["2023-03", "2023-12"],
                text: "Product support for SAP Commerce Cloud.",
                points: [
                    "Handled more than 20 tickets a month from large customers in several countries.",
                    "Diagnosed and solved product problems, followed implementations through and reported the results to customers.",
                ],
                tools: "Kibana, Dynatrace, ServiceNow, JIRA, Git",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "Developer and IT assistant",
                short: "UFRGS",
                place: "UFRGS",
                dates: ["2017-01", "2020-07"],
                text: "Three roles during the degree: full stack and then front-end developer on teaching and research sites (2017–2019), then IT support for the Faculty of Veterinary Medicine (2019–2020).",
                tools: "JavaScript, HTML5, CSS, PHP, Apache Server, hardware, operating systems, networks",
                link: "http://www.ufrgs.br/ufrgs/ensino/apresentacao",
            },
        ],
    },
    education: {
        heading: "Education",
        more: "Course page",
        items: [
            {
                title: "Physics engineering",
                place: "UFRGS",
                dates: "2017 – 2027",
                city: "Porto Alegre",
                note: "Alongside work since 2023; expected to finish in 2027.",
                link: "https://engfis.if.ufrgs.br/index.php/P%C3%A1gina_principal",
            },
            {
                title: "Mechatronics technician",
                place: "IFSC",
                dates: "2014 – 2016",
                city: "Criciúma",
                note: "A technical course integrated with high school: electronics, automation and microcontrollers.",
                link: "https://www.ifsc.edu.br/tecnicos-integrados/-/visualizar/mecatronica/Campus-Criciuma/172/228/nO9EQhPgKNer",
            },
        ],
    },
    contact: {
        form: "Or use the form",
        resume: "Résumé (PDF)",
        title: "Contact",
        copy: { email: "Copy email", phone: "Copy phone number" },
        copied: { email: "Email copied", phone: "Phone number copied" },
    },
    search: {
        label: "Search the page",
        placeholder: "Projects, roles, skills or actions…",
        enter: "Enter",
        empty: "Nothing on this page matches that. Try a technology, like Vue or Kotlin.",
        goTo: "Go to the section",
        shortcuts: { label: "Shortcuts", experience: "Experience", work: "Projects", linkedin: "LinkedIn", email: "Email" },
        copied: "Email copied.",
        keys: { choose: "choose", open: "open", close: "close" },
        groups: {
            action: "Actions",
            section: "Go to",
            project: "Projects",
            role: "Roles",
            edu: "Education",
        },
        // [title, line under it, extra words that find it]
        actions: {
            theme: ["Switch theme", "Light or dark", "theme dark light mode"],
            language: ["Switch to Português", "Language", "language portuguese português idioma"],
            email: ["Copy email", "", "email e-mail contact copy"],
            download: ["Download Sizewise", "Windows, latest release", "download sizewise app windows"],
        },
    },
    footer: {
        sections: "On this page",
        rights: "João Lucas Miranda Menegasso, 2026",
        top: "Back to top",
        morph: "Swap between the name and the initials",
        keys: {
            label: "Keyboard shortcuts",
            focus: "hold to focus the navigation",
            jump: "jumps to each section",
            search: "search",
            theme: "switches the theme",
            debug: "shows the grid",
        },
    },
    dialog: {
        title: "Send me a message",
        sub: "I reply to email faster than WhatsApp.",
        name: "Name",
        subject: "Subject",
        email: "Your email",
        message: "Message",
        send: "Send message",
        sending: "Sending…",
        sent: "Message sent. I’ll answer soon.",
        error: "Something went wrong. Please write to joaol_mm@hotmail.com instead.",
        close: "Close",
    },
};

const portuguese: Copy = {
    nav: {
        work: "Projetos",
        experience: "Experiência",
        education: "Educação",
        contact: "Contato",
        language: "English",
        languageShort: "EN",
        languageNow: "Idioma: Português. Mudar para English",
        theme: "Modo escuro",
        top: "João Lucas, início da página",
        sections: "Seções",
        menu: "JL, menu de seções",
        close: "Fechar",
        toTop: "Início",
        search: "Buscar",
        skip: "Pular para o conteúdo",
    },
    hero: {
        role: "engenheiro mobile e front-end",
        company: "na Nelogica",
        before: "Nos apps do Profit e do Tryd que traders usam todos os dias. Antes, suporte, QA e desenvolvimento na SAP.",
        portrait: "Retrato de João Lucas",
        resume: "Currículo (PDF)",
    },
    about: {
        heading: "Sobre",
        lead: "Sou João Lucas Miranda Menegasso",
        first: " e já sentei em todas as mesas por onde um bug passa: suporte, QA e desenvolvimento na SAP, e agora mobile na Nelogica.",
        body: [
            "Desenvolvo os apps mobile das plataformas de trading da Nelogica e desço abaixo da interface quando o problema pede, até o Kotlin e o Swift nativos. Antes do software vieram o técnico em mecatrônica e a engenharia física na UFRGS, onde aprendi a medir antes de mudar qualquer coisa.",
        ],
        facts: [
            ["Mora em", "Porto Alegre, Brasil"],
            ["Agora", "Engenheiro de software mobile na Nelogica"],
            ["Fala", "Português, English (fluente), Español (intermediário)"],
        ],
        stackHeading: "Stack",
        // [grupo, ferramentas]
        stack: [
            ["No dia a dia", "Vue.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, CapacitorJS"],
            ["Nativo", "Kotlin (Jetpack Compose), Java, Swift, plugins Capacitor"],
            ["Também", "React, SQL, Rust, Tauri, Node.js, SAP UI5, SAP CAP"],
            ["Testes e entrega", "Selenium WebDriver, Jest, GitHub Actions, GitLab, Git, OpenSearch"],
            ["Time", "Scrum, Figma, JIRA"],
        ],
    },
    work: {
        heading: "Projetos",
        run: "Rodar aqui",
        stop: "Mostrar a imagem",
        site: "Abrir o site",
        code: "Código no GitHub",
        download: "Baixar para Windows",
        post: "Post no LinkedIn",
        frameTitle: "Projeto ao vivo",
        windowsOnly: "App para Windows. Baixe pelo computador.",
        hint: "Projetos. Use as setas para trocar.",
        next: "A seguir",
        previous: "Projeto anterior",
        following: "Próximo projeto",
        goTo: "Ver",
        of: "de",
        items: [
            {
                name: "Sizewise",
                shot: "Janela do Sizewise depois de analisar o disco C: totais de tamanho, arquivos e pastas, e as maiores pastas com a fatia de cada uma no disco",
                kind: "App Windows, Rust + Tauri + Vue",
                description:
                    "Mostra para onde vai o espaço do disco sem tocar em nenhum arquivo: varredura paralela em Rust, árvore de pastas virtualizada e os 100 maiores arquivos. Núcleo testado, versões geradas pelo GitHub Actions.",
            },
            {
                name: "Gerador QR",
                shot: "Página do Gerador QR: o campo de conteúdo, o botão Generate e o QR code gerado",
                kind: "Gerador de QR, API REST",
                description:
                    "Digite um link ou uma frase e receba o QR code de uma API RESTful, pronto para salvar.",
            },
            {
                name: "Pokedex",
                shot: "Página do Pokedex desenhada como uma Pokédex vermelha, mostrando 6 - Charizard, a busca por nome ou número e os botões Prev e Next",
                kind: "Cliente de API REST",
                description:
                    "Pesquise qualquer Pokémon por nome ou número; os dados chegam ao vivo de uma API RESTful pública.",
            },
        ],
    },
    experience: {
        locale: "pt-BR",
        heading: "Experiência",
        company: "Sobre a empresa",
        tools: "Ferramentas",
        units: { year: ["ano", "anos"], month: ["mês", "meses"], and: " e ", now: "hoje" },
        betweenHeading: "Entre cargos",
        between: [
            { dates: ["2025-04", "2025-08"], text: "Entre a SAP e a Nelogica: projetos pessoais e busca por emprego." },
            { dates: ["2020-08", "2023-02"], text: "Dedicação integral à engenharia física na UFRGS." },
        ],
        items: [
            {
                title: "Engenheiro de software, mobile",
                short: "Mobile",
                place: "Nelogica",
                dates: ["2025-09", null],
                text: "Apps híbridos (Vue + Capacitor) Android e iOS do Profit, do Tryd e de outros produtos de trading da Nelogica, usados por mais de 100 mil pessoas.",
                points: [
                    "Reduzi a abertura a frio até a tela inicial de 16 s para cerca de 1,2 s movendo a limpeza de bundles nas atualizações para uma worker thread, depois que plugins nativos em Kotlin e Swift mostraram para onde o tempo ia.",
                    "Construí o Cloud Automation no Profit Mobile do desenho dos fluxos ao lançamento: traders rodam robôs de estratégia no servidor sem o app desktop aberto.",
                    "Reduzi o carregamento geral em cerca de 35% com carregamento crítico, adiado e lazy loading, atualização de dependências e animações otimizadas para GPU.",
                    "Reconstruí a barra de navegação com efeito no estilo Liquid Glass do iOS e gestos, com o time de UX, e criei dashboards no OpenSearch sobre o uso do produto.",
                ],
                tools: "Vue.js, TypeScript, Tailwind CSS, CapacitorJS, Kotlin, Swift, OpenSearch, GitLab, Figma, Scrum",
                link: "https://www.nelogica.com.br/",
            },
            {
                title: "Estagiário do programa de rotação, desenvolvedor",
                short: "Desenvolvedor",
                place: "SAP",
                dates: ["2024-08", "2025-03"],
                text: "SAP Intelligent Agriculture, solução de gestão logística de fazendas, em um time Scrum.",
                points: [
                    "Corrigi bugs, mantive as funcionalidades de logística e documentei o código para o time.",
                    "Levei a visão do QA para o desenvolvimento, validando antes de cada entrega.",
                ],
                tools: "TypeScript, CAP, UI5, Fiori Elements, Node.js, Scrum",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "Estagiário do programa de rotação, QA",
                short: "QA",
                place: "SAP",
                dates: ["2023-12", "2024-08"],
                text: "Automação de testes no pipeline de entrega do produto.",
                points: [
                    "Automatizei os testes E2E com Selenium WebDriver.",
                    "Criei a inserção automática dos dados de teste, o que eliminou falhas recorrentes no pipeline.",
                    "Escrevi protocolos de teste que impediram a volta de problemas já corrigidos ao pipeline de deploy.",
                ],
                tools: "Selenium WebDriver, JavaScript, Git",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "Estagiário do programa de rotação, suporte ao produto",
                short: "Suporte",
                place: "SAP",
                dates: ["2023-03", "2023-12"],
                text: "Suporte ao produto SAP Commerce Cloud.",
                points: [
                    "Atendi mais de 20 chamados por mês de grandes clientes em diversos países.",
                    "Diagnostiquei e resolvi problemas do produto, acompanhei implementações e entreguei relatórios de resultados aos clientes.",
                ],
                tools: "Kibana, Dynatrace, ServiceNow, JIRA, Git",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "Desenvolvedor e assistente de TI",
                short: "UFRGS",
                place: "UFRGS",
                dates: ["2017-01", "2020-07"],
                text: "Três funções durante a graduação: desenvolvedor full stack e depois front-end em sites de ensino e pesquisa (2017–2019), e então suporte de TI na Faculdade de Veterinária (2019–2020).",
                tools: "JavaScript, HTML5, CSS, PHP, Apache Server, hardware, sistemas operacionais, redes",
                link: "http://www.ufrgs.br/ufrgs/ensino/apresentacao",
            },
        ],
    },
    education: {
        heading: "Educação",
        more: "Página do curso",
        items: [
            {
                title: "Engenharia física",
                place: "UFRGS",
                dates: "2017 – 2027",
                city: "Porto Alegre",
                note: "Em paralelo ao trabalho desde 2023; conclusão prevista para 2027.",
                link: "https://engfis.if.ufrgs.br/index.php/P%C3%A1gina_principal",
            },
            {
                title: "Técnico em mecatrônica",
                place: "IFSC",
                dates: "2014 – 2016",
                city: "Criciúma",
                note: "Curso técnico integrado ao ensino médio: eletrônica, automação e microcontroladores.",
                link: "https://www.ifsc.edu.br/tecnicos-integrados/-/visualizar/mecatronica/Campus-Criciuma/172/228/nO9EQhPgKNer",
            },
        ],
    },
    contact: {
        form: "Ou use o formulário",
        resume: "Currículo (PDF)",
        title: "Contato",
        copy: { email: "Copiar e-mail", phone: "Copiar telefone" },
        copied: { email: "E-mail copiado", phone: "Telefone copiado" },
    },
    search: {
        label: "Buscar na página",
        placeholder: "Projetos, cargos, tecnologias…",
        enter: "Enter",
        empty: "Nada nesta página corresponde a isso. Tente uma tecnologia, como Vue ou Kotlin.",
        goTo: "Ir para a seção",
        shortcuts: { label: "Atalhos", experience: "Experiência", work: "Projetos", linkedin: "LinkedIn", email: "E-mail" },
        copied: "E-mail copiado.",
        keys: { choose: "escolher", open: "abrir", close: "fechar" },
        groups: {
            action: "Ações",
            section: "Ir para",
            project: "Projetos",
            role: "Cargos",
            edu: "Educação",
        },
        // [título, linha embaixo, outras palavras que o encontram]
        actions: {
            theme: ["Trocar tema", "Claro ou escuro", "tema escuro claro modo theme"],
            language: ["Mudar para English", "Idioma", "idioma inglês ingles english language"],
            email: ["Copiar e-mail", "", "email e-mail contato copiar"],
            download: ["Baixar o Sizewise", "Windows, versão mais recente", "baixar download sizewise app windows"],
        },
    },
    footer: {
        sections: "Nesta página",
        rights: "João Lucas Miranda Menegasso, 2026",
        top: "Voltar ao topo",
        morph: "Trocar entre o nome e as iniciais",
        keys: {
            label: "Atalhos de teclado",
            focus: "segure para focar a navegação",
            jump: "vai para cada seção",
            search: "busca",
            theme: "troca o tema",
            debug: "mostra a grade",
        },
    },
    dialog: {
        title: "Me envie uma mensagem",
        sub: "Respondo e-mail mais rápido que WhatsApp.",
        name: "Nome",
        subject: "Assunto",
        email: "Seu e-mail",
        message: "Mensagem",
        send: "Enviar mensagem",
        sending: "Enviando…",
        sent: "Mensagem enviada. Respondo em breve.",
        error: "Algo deu errado. Escreva para joaol_mm@hotmail.com.",
        close: "Fechar",
    },
};

const content: Record<Language, Copy> = { english, portuguese };

export { links, projectLinks };
export default content;
