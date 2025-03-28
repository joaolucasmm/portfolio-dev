import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Sobre",
    "Projetos",
    "Serviços",
    "Experiência",
    "Educação",
    "Contato",
    "Idioma",
    "Modo escuro"
];

const textEnglish = [
    "About",
    "Projects",
    "Services",
    "Experience",
    "Education",
    "Info",
    "Language",
    "Dark mode"
];

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, {textEnglish, textPortuguese});
}

export default textSelector;
