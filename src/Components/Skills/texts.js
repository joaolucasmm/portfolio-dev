import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Habilidades"
];

const textEnglish = [
    "Skills"
];

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
