import sendMessage from "../../Functions/textSelector";

const textPortuguese = [
    "Habilidades",
    "Projetos",
    "Contato",
    "Currículo"
];

const textEnglish = [
    "Skills",
    "Projects",
    "Contact",
    "Resume"
];

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, {textEnglish, textPortuguese});
}

export default textSelector;
