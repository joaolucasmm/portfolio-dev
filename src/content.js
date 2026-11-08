// All copy on the page, in both languages. Components read `content[language]`.

const links = {
    email: "joaol_mm@hotmail.com",
    phone: "+55 48 99633-0209",
    phoneHref: "tel:+5548996330209",
    github: "https://github.com/joaolucasmm",
    linkedin: "https://www.linkedin.com/in/jo%C3%A3o-lucas-miranda-menegasso/",
    resume: {
        english:
            "https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoResume.pdf",
        portuguese:
            "https://raw.githubusercontent.com/joaolucasmm/portfolio/main/src/Assets/Documents/JoaoLucasMirandaMenegassoCurriculo.pdf",
    },
};

const projectLinks = [
    {
        url: "https://joaolucasmm.github.io/my-links/",
        repo: "https://github.com/joaolucasmm/my-links",
        year: "2022",
    },
    {
        url: "https://joaolucasmm.github.io/Pokedex/",
        repo: "https://github.com/joaolucasmm/Pokedex",
        year: "2022",
    },
    {
        url: "https://joaolucasmm.github.io/TicTacToe/",
        repo: "https://github.com/joaolucasmm/TicTacToe",
        year: "2024",
    },
    {
        url: "https://joaolucasmm.github.io/QRcodeGen/",
        repo: "https://github.com/joaolucasmm/QRcodeGen/",
        post: "https://www.linkedin.com/feed/update/urn:li:activity:7316523182281187329/",
        year: "2025",
    },
];

const english = {
    nav: {
        work: "Work",
        experience: "Experience",
        services: "Services",
        education: "Education",
        contact: "Contact",
        language: "Português",
        languageShort: "PT",
        theme: ["Light", "Dark"],
        menu: "Menu",
        close: "Close",
    },
    hero: {
        role: "fullstack developer",
        sentence:
            "Fullstack developer. Two years at SAP as support engineer, QA engineer and software developer, now open to new work.",
        action: "Email me",
        resume: "Resume (PDF)",
        portrait: "Portrait of João Lucas",
    },
    about: {
        heading: "About",
        lead: "João Lucas Miranda Menegasso",
        first:
            " has sat at every desk a bug passes: support engineer, QA engineer and developer, all inside SAP's rotation programme.",
        body: [
            "He answered bugs on the phone with customers, caught them with end-to-end tests, and fixed them in the product's repository. Today he builds web software end to end in React, TypeScript and Node, and writes the tests himself.",
            "Before that came a mechatronics diploma, a lot of Arduino boards and a physics engineering degree at UFRGS. He answers email faster than WhatsApp.",
        ],
        facts: [
            ["Based in", "Southern Brazil"],
            ["Writing code since", "2014"],
            ["Speaks", "English, Português"],
        ],
    },
    work: {
        heading: "Projects",
        run: "Run it here",
        stop: "Show the picture",
        site: "Open the site",
        code: "Code on GitHub",
        post: "LinkedIn post",
        frameTitle: "Live project",
        items: [
            {
                name: "My Links",
                kind: "Link page in React",
                description:
                    "A page with links to all my profiles, laid out with flexbox and responsive down to a phone.",
            },
            {
                name: "Pokedex",
                kind: "REST API client",
                description:
                    "Search any Pokémon by name or number; the data comes live from a public RESTful API.",
            },
            {
                name: "TicTacToe",
                kind: "Game in React state",
                description:
                    "A two-player game built from plain logic and React state variables, with a reset and a winner check.",
            },
            {
                name: "QR Code Gen",
                kind: "QR generator, REST API",
                description:
                    "Type a link or a line of text and get its QR code back from a RESTful API, ready to save.",
            },
        ],
    },
    experience: {
        heading: "Experience",
        more: "Read more",
        less: "Close",
        company: "About the company",
        items: [
            {
                title: "Software developer",
                short: "Developer",
                place: "SAP",
                dates: "Jul 2024 – Mar 2025",
                length: "8 months",
                text: "Wrote code in the product's repository to fix bugs, change features and update functional behaviour, and documented every change. Organised the work in the JIRA backlog and took part in planning, review, refinement and daily meetings to agree next steps with the team. Tested the API services our team provided.",
                tools: "TypeScript, CAP, GitHub, UI5, Fiori Elements, Node.js, Webdriver.io, Shell Script",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "QA engineer",
                short: "QA engineer",
                place: "SAP",
                dates: "Nov 2023 – Jul 2024",
                length: "8 months",
                text: "Verified data consistency through product analysis and code review. Reported bugs and errors to the responsible teams, worked with developers on each issue and kept the quality standards in place. Built end-to-end test automation, and set up and logged data to judge how usable each feature really was.",
                tools: "TypeScript, GitHub, Node.js, Webdriver.io, Shell Script",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "Support engineer",
                short: "Support",
                place: "SAP",
                dates: "Mar 2023 – Nov 2023",
                length: "8 months",
                text: "Supported customers by researching each incident and its links to past incidents, notes and knowledge base articles. Called customers to understand the problem, give updates and speed incidents up. Reviewed incidents proactively for improvements, wrote and improved knowledge base articles, and brought in other teams when a customer needed the full picture.",
                tools: "Kibana, Dynatrace, ServiceNow",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "IT support",
                short: "IT support",
                place: "UFRGS",
                dates: "Jan 2019 – Jul 2020",
                length: "1 year 6 months",
                text: "Maintained and repaired computers, installed and configured software, kept the inventory in order and looked after the network.",
                tools: "Excel, Google Forms, OS installers, hardware tools",
                link: "http://www.ufrgs.br/ufrgs/ensino/apresentacao",
            },
            {
                title: "Web developer",
                short: "Web developer",
                place: "UFRGS",
                dates: "Jan 2017 – Dec 2018",
                length: "2 years",
                text: "Built an educational website about vitamins and coenzymes, and a website for the virtual evaluation of total protein in blood serum.",
                tools: "JavaScript, PHP, HTML5, CSS, Adobe Animate, Apache Server",
                link: "http://www.ufrgs.br/ufrgs/ensino/apresentacao",
            },
        ],
    },
    services: {
        heading: "What I can do for you",
        tools: "Tools",
        items: [
            {
                title: "Fullstack development",
                text: "Professional websites, servers and APIs, blogs, SaaS products, landing pages, online shops and automated systems.",
                second: "From the first sketch to the deployed site, with the tests written alongside the code.",
                tools: "React, TypeScript, Node.js, SAP CAP, UI5, Sass",
            },
            {
                title: "Quality assurance",
                text: "Automated tests that keep your software honest: unit tests, integration tests and end-to-end tests.",
                second: "I spent eight months doing only this at SAP, so the suite will run in your pipeline, not just on my machine.",
                tools: "Webdriver.io, Jest, GitHub Actions, Shell Script",
            },
            {
                title: "Consulting",
                text: "Advice on IT services, automation and software development, from someone who has also answered the support line.",
                second: "Bring the problem as you would describe it to a customer; I will turn it into steps.",
                tools: "Kibana, Dynatrace, ServiceNow, Arduino",
            },
        ],
    },
    education: {
        heading: "Education",
        more: "Course page",
        photo: "Campus do Vale, UFRGS, Porto Alegre",
        items: [
            {
                title: "Physics engineering",
                place: "UFRGS",
                dates: "2017 – now",
                city: "Porto Alegre",
                text: "An interdisciplinary degree that joins the principles of physics to engineering practice: quantum mechanics, electromagnetism and thermodynamics on one side, electronics, programming and robotics on the other, with a strong emphasis on research and development. It is where I learned to measure before I change anything.",
                link: "https://engfis.if.ufrgs.br/index.php/P%C3%A1gina_principal",
            },
            {
                title: "Mechatronics technician",
                place: "IFSC",
                dates: "2014 – 2016",
                city: "Criciúma",
                text: "A technical course that integrates mechanics, electronics, automation and programming: pneumatics, hydraulics, PLCs, sensors, robotics, CNC and microcontrollers such as Arduino. My first code ran on a board, not in a browser.",
                link: "https://www.ifsc.edu.br/tecnicos-integrados/-/visualizar/mecatronica/Campus-Criciuma/172/228/nO9EQhPgKNer",
            },
        ],
    },
    contact: {
        heading: "Write about a project, a role, or a stubborn bug.",
        form: "Or use the form",
        place: "Southern Brazil",
        copied: "Address copied",
    },
    footer: {
        sections: "On this page",
        elsewhere: "Elsewhere",
        credits: "Photo credits",
        rights: "João Lucas Miranda Menegasso, 2026",
        top: "Back to top",
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
        sent: "Message sent. I'll answer soon.",
        error: "Something went wrong. Please write to joaol_mm@hotmail.com instead.",
        close: "Close",
    },
};

const portuguese = {
    nav: {
        work: "Projetos",
        experience: "Experiência",
        services: "Serviços",
        education: "Educação",
        contact: "Contato",
        language: "English",
        languageShort: "EN",
        theme: ["Claro", "Escuro"],
        menu: "Menu",
        close: "Fechar",
    },
    hero: {
        role: "desenvolvedor fullstack",
        sentence:
            "Desenvolvedor fullstack. Dois anos na SAP como engenheiro de suporte, de qualidade e desenvolvedor, agora aberto a novos trabalhos.",
        action: "Me envie um e-mail",
        resume: "Currículo (PDF)",
        portrait: "Retrato de João Lucas",
    },
    about: {
        heading: "Sobre",
        lead: "João Lucas Miranda Menegasso",
        first:
            " já sentou em todas as mesas por onde um bug passa: suporte, qualidade e desenvolvimento, no programa de rotação da SAP.",
        body: [
            "Atendeu bugs ao telefone com clientes, encontrou-os com testes end-to-end e corrigiu-os no repositório do produto. Hoje constrói software web de ponta a ponta com React, TypeScript e Node, e escreve ele mesmo os testes.",
            "Antes disso vieram o técnico em mecatrônica, muitas placas Arduino e a engenharia física na UFRGS. Responde e-mail mais rápido que WhatsApp.",
        ],
        facts: [
            ["Mora no", "Sul do Brasil"],
            ["Programa desde", "2014"],
            ["Fala", "Português, English"],
        ],
    },
    work: {
        heading: "Projetos",
        run: "Rodar aqui",
        stop: "Mostrar a imagem",
        site: "Abrir o site",
        code: "Código no GitHub",
        post: "Post no LinkedIn",
        frameTitle: "Projeto ao vivo",
        items: [
            {
                name: "Meus Links",
                kind: "Página de links em React",
                description:
                    "Uma página com links para todos os meus perfis, organizada com flexbox e responsiva até o celular.",
            },
            {
                name: "Pokedex",
                kind: "Cliente de API REST",
                description:
                    "Pesquise qualquer Pokémon por nome ou número; os dados chegam ao vivo de uma API RESTful pública.",
            },
            {
                name: "Jogo da Velha",
                kind: "Jogo com estado React",
                description:
                    "Um jogo para dois jogadores feito com lógica simples e variáveis de estado do React, com reinício e verificação de vencedor.",
            },
            {
                name: "Gerador QR",
                kind: "Gerador de QR, API REST",
                description:
                    "Digite um link ou uma frase e receba o QR code de uma API RESTful, pronto para salvar.",
            },
        ],
    },
    experience: {
        heading: "Experiência",
        more: "Ler mais",
        less: "Fechar",
        company: "Sobre a empresa",
        items: [
            {
                title: "Desenvolvedor de software",
                short: "Desenvolvedor",
                place: "SAP",
                dates: "Jul 2024 – Mar 2025",
                length: "8 meses",
                text: "Escrevi código no repositório do produto para corrigir bugs, modificar funcionalidades e atualizar o comportamento funcional, e documentei cada alteração. Organizei as tarefas no backlog do JIRA e participei das reuniões de planejamento, revisão, refinamento e diárias para combinar os próximos passos com a equipe. Testei os serviços de API fornecidos pela equipe.",
                tools: "TypeScript, CAP, GitHub, UI5, Fiori Elements, Node.js, Webdriver.io, Shell Script",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "Engenheiro de qualidade",
                short: "Qualidade",
                place: "SAP",
                dates: "Nov 2023 – Jul 2024",
                length: "8 meses",
                text: "Verifiquei a consistência de dados por meio de análises de produto e revisões de código. Notifiquei as equipes responsáveis sobre bugs e erros, conversei com os desenvolvedores sobre cada problema e garanti que os padrões de qualidade fossem mantidos. Desenvolvi automação de testes E2E e configurei e registrei dados para avaliar a usabilidade das funcionalidades.",
                tools: "TypeScript, GitHub, Node.js, Webdriver.io, Shell Script",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "Engenheiro de suporte",
                short: "Suporte",
                place: "SAP",
                dates: "Mar 2023 – Nov 2023",
                length: "8 meses",
                text: "Dei suporte aos clientes pesquisando cada incidente e suas relações com incidentes passados, notas e artigos da base de conhecimento. Liguei para clientes para entender os problemas, dar atualizações e agilizar os incidentes. Revisei incidentes de forma proativa em busca de melhorias, escrevi e melhorei artigos da base de conhecimento e envolvi outras equipes quando o cliente precisava da informação completa.",
                tools: "Kibana, Dynatrace, ServiceNow",
                link: "https://www.sap.com/about/company.html",
            },
            {
                title: "Técnico de TI",
                short: "Técnico de TI",
                place: "UFRGS",
                dates: "Jan 2019 – Jul 2020",
                length: "1 ano e 6 meses",
                text: "Manutenção e reparo de computadores, instalação e configuração de software, organização do inventário e manutenção da rede.",
                tools: "Excel, Google Forms, instaladores de SO, ferramentas de hardware",
                link: "http://www.ufrgs.br/ufrgs/ensino/apresentacao",
            },
            {
                title: "Desenvolvedor web",
                short: "Web",
                place: "UFRGS",
                dates: "Jan 2017 – Dez 2018",
                length: "2 anos",
                text: "Desenvolvi um site educacional sobre vitaminas e coenzimas e um site de avaliação virtual da proteína total no soro sanguíneo.",
                tools: "JavaScript, PHP, HTML5, CSS, Adobe Animate, Apache Server",
                link: "http://www.ufrgs.br/ufrgs/ensino/apresentacao",
            },
        ],
    },
    services: {
        heading: "O que posso fazer por você",
        tools: "Ferramentas",
        items: [
            {
                title: "Desenvolvimento fullstack",
                text: "Sites profissionais, servidores e APIs, blogs, SaaS, landing pages, lojas virtuais e sistemas automatizados.",
                second: "Do primeiro rascunho ao site publicado, com os testes escritos junto com o código.",
                tools: "React, TypeScript, Node.js, SAP CAP, UI5, Sass",
            },
            {
                title: "Controle de qualidade",
                text: "Testes automatizados que mantêm seu software honesto: testes unitários, de integração e end-to-end.",
                second: "Passei oito meses fazendo só isso na SAP; a suíte vai rodar no seu pipeline, não só na minha máquina.",
                tools: "Webdriver.io, Jest, GitHub Actions, Shell Script",
            },
            {
                title: "Consultoria",
                text: "Consultoria em serviços de TI, automação e desenvolvimento de software, de alguém que também já atendeu o suporte.",
                second: "Traga o problema como você contaria a um cliente; eu transformo em passos.",
                tools: "Kibana, Dynatrace, ServiceNow, Arduino",
            },
        ],
    },
    education: {
        heading: "Educação",
        more: "Página do curso",
        photo: "Campus do Vale, UFRGS, Porto Alegre",
        items: [
            {
                title: "Engenharia física",
                place: "UFRGS",
                dates: "2017 – hoje",
                city: "Porto Alegre",
                text: "Uma graduação interdisciplinar que une os princípios da física à prática da engenharia: mecânica quântica, eletromagnetismo e termodinâmica de um lado, eletrônica, programação e robótica do outro, com forte ênfase em pesquisa e desenvolvimento. Foi onde aprendi a medir antes de mudar qualquer coisa.",
                link: "https://engfis.if.ufrgs.br/index.php/P%C3%A1gina_principal",
            },
            {
                title: "Técnico em mecatrônica",
                place: "IFSC",
                dates: "2014 – 2016",
                city: "Criciúma",
                text: "Um curso técnico que integra mecânica, eletrônica, automação e programação: pneumática, hidráulica, CLPs, sensores, robótica, CNC e microcontroladores como o Arduino. Meu primeiro código rodou numa placa, não num navegador.",
                link: "https://www.ifsc.edu.br/tecnicos-integrados/-/visualizar/mecatronica/Campus-Criciuma/172/228/nO9EQhPgKNer",
            },
        ],
    },
    contact: {
        heading: "Escreva sobre um projeto, uma vaga ou um bug teimoso.",
        form: "Ou use o formulário",
        place: "Sul do Brasil",
        copied: "Endereço copiado",
    },
    footer: {
        sections: "Nesta página",
        elsewhere: "Em outros lugares",
        credits: "Créditos das fotos",
        rights: "João Lucas Miranda Menegasso, 2026",
        top: "Voltar ao topo",
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

const content = { english, portuguese };

export { links, projectLinks };
export default content;
