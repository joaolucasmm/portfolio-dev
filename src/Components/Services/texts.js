import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Serviços",
    "Desenvolvimento Fullstack",
    "Desenvolvo sites profissionais, servidores, APIs, blogs, SaaS, landing pages, e-commerce e sistemas automatizado.",
    "Controle de Qualidade",
    "Desenvolvo testes automatizados para garantir a qualidade do seu software, testes unitários, testes E2E e testes de integração.",
    "Consultoria",
    "Presto consultoria em serviços de TI, serviços de automação, desenvolvimento de software e entre outros."
]


const textEnglish = [
    "Services",
    "Fullstack development",
    "I develop professional websites, servers, APIs, blogs, SaaS, landing pages, e-commerce and automated systems.",
    "Quality Assurance",
    "Develop automated tests to ensure the quality of your software, unit tests, E2E tests and integration tests.",
    "Consulting",
    "I provide consulting services in IT services, automation services, software development and others."
]

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
