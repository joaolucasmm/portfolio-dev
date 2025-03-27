import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Experiência",
    "Desenvolvedor de Software",
    "Engenheiro de Controle de Qualidade",
    "Engenheiro de Suporte",
    "Técnico de TI",
    "Desenvolvedor Web",
    "Jul 2024 - Mar 2025 (8 meses)",
    "Nov 2023 - Jul 2024 (8 meses)",
    "Mar 2023 - Nov 2023 (8 meses)",
    "Jan 2019 - Jul 2020 (1 ano and 6 meses)",
    "Jan 2017 - Dez 2018 (2 anos)",
    "SAP",
    "SAP",
    "SAP",
    "UFRGS",
    "UFRGS",
    "Responsável por escrever código no repositório do produto para resolver bugs, modificar funcionalidades e atualizar o comportamento funcional. Documentei as alterações de software e utilizei o backlog do JIRA para organizar as tarefas. Participei de reuniões de planejamento, revisão, refinamento e diárias, mantendo comunicação constante com a equipe sobre o status das tarefas e planejamento dos próximos passos. Atuei na testagem de serviços de API fornecidos pela equipe.",
    "Linguagens e Ferramentas: TypeScript, CAP, GitHub, UI5, Fiori Elements, NodeJS, Webdriver.io e Shell Script.",
    "Responsável pela verificação da consistência de dados por meio de análises de produtos e revisões de código. Notifiquei as equipes responsáveis sobre bugs e erros, comuniquei-me com os desenvolvedores a respeito das questões e garanti que os padrões de qualidade fossem mantidos. Formulei estratégias que asseguraram a estabilidade a longo prazo do uso do produto. Desenvolvi automação de testes E2E, configurei e loguei dados para avaliar a usabilidade das funcionalidades.",
    "Linguagens e Ferramentas: TypeScript, GitHub, NodeJS, Webdriver.io e Shell Script.",
    "Responsável por fornecer suporte aos clientes, pesquisando e analisando cada cenário de incidente e suas correlações com incidentes passados, notas e artigos da base de conhecimento. Realizei chamadas para os clientes a fim de entender melhor os problemas, fornecer atualizações e agilizar o processamento de incidentes. Revisei proativamente os incidentes e verifiquei pontos de melhoria. Escrevi e melhorei artigos da base de conhecimento. Contatei outras equipes para oferecer aos clientes informações completas e detalhadas.",
    "Ferramentas: Kibana, Dynatrace, Service Now.",
    "Manutenção e reparo de computadores. Instalação e configuração de software. Organização de inventário. Manutenção de rede.",
    "Tools: Excel, Google Forms, OS installer, hardware tools.",
    "Desenvolvimento de Website Educacional sobre Vitaminas e Coenzimas + Website de Avaliação Virtual da Proteína Total no Soro Sanguíneo.",
    "Linguagens e Ferramentas: Javascript, PHP, HTML5, CSS, Adobe Animate and Apache Server"
]


const textEnglish = [
    "Experience",
    "Software Developer",
    "Quality Assurance Engineer",
    "Support Engineer",
    "IT Support",
    "Web Developer",
    "Jul 2024 - Mar 2025 (8 months)",
    "Nov 2023 - Jul 2024 (8 months)",
    "Mar 2023 - Nov 2023 (8 months)",
    "Jan 2019 - Jul 2020 (1 year and 6 months)",
    "Jan 2017 - Dec 2018 (2 years)",
    "SAP",
    "SAP",
    "SAP",
    "UFRGS",
    "UFRGS",
    "Write code into the product's repository in order to solve bugs, modify features, update functional behavior. Document the software changes. Use JIRA backlog to organize tasks. Participate in planning, review, refinement and daily meetings to communicate with other members of the team regarding the situation of the tasks and plan next steps. Work in testing API services provided by our team.",
    "Languages and Tools: Typescript, CAP, GitHub, UI5, Fiori Elements, NodeJS, Webdriver.io and Shell Script.",
    "Deliver data consistency verification thorough product analyses and code reviews. Notify responsible teams of bugs and errors, communicate with developers regarding issues, and ensure quality standards are maintained. Formulate strategies that guarantee the long-term stability of product use. Development of E2E test automation, setup and logging of data to assess the functionality usability of the features.",
    "Languages and Tools: Typescript, GitHub, NodeJS, Webdriver.io and Shell Script.",
    "Provide support to customers by researching and analyzing each incident scenario and its correlations with past incidents, Notes and KBAs. Provide calls to customers to better understand issues, provide updates, and speed up incident processing. Proactively review incidents and check for improvement points. Write and improve Knowledge Base Articles. Contact other teams to delight customers with complete and detailed information.",
    "Tools: Kibana, Dynatrace, Service Now.",
    "Maintenance and repair of computers. Software installation and configuration. Inventory organization. Network maintenance.",
    "Tools: Excel, Google Forms, OS installer, hardware tools.",
    "Development of Vitamins and coenzymes educational website + Virtual evaluation of total protein in blood serum website.",
    "Languages and Tools: Javascript, PHP, HTML5, CSS, Adobe Animate and Apache Server."
]

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
