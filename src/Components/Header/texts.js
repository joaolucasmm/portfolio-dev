import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Sobre",
    "Projetos",
    "Serviços",
    "Experiência",
    "Educação",
    "Contato"
];

const textEnglish = [
    "About",
    "Projects",
    "Services",
    "Experience",
    "Education",
    "Info"
];

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, {textEnglish, textPortuguese});
}

export default textSelector;
