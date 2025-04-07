import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Olá, eu sou João Lucas!",
    "- Desenvolvedor Fullstack.",
    "Seu projeto merece mais que linhas de código:",
    "Precisa de estratégia, usabilidade e tecnologia que entregue valor real. Como Desenvolvedor FullStack, oriento soluções completas – do conceito à publicação – para conectar marcas a seus clientes de forma eficiente.",
    "Transformando ideias em produtos digitais de alto impacto. Do design à implantação, crio soluções escaláveis, performáticas e centradas na melhor experiência do usuário – gerando resultados para empresas e negócios.",
    "Baixe meu currículo",
    "Me envie um e-mail"
]


const textEnglish = [
    "Hello, I am João Lucas!",
    "- Fullstack Developer.",
    "Your project deserves more than lines of code:",
    "It needs strategy, usability and technology that delivers real value. As a FullStack Developer, I guide complete solutions – from concept to publication – to connect brands to their customers efficiently.",
    "Transforming ideas into high-impact digital products. From design to deployment, I create scalable, performative solutions centered on the best user experience – generating results for companies and businesses.",
    "Download my resume",
    "Send me a e-mail"
]

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
