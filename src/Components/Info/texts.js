import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Contato",
    "GitHub",
    "LinkedIn",
    "joaol_mm@hotmail.com",
    "(48) 996330209"
];

const textEnglish = [
    "Contact info",
    "GitHub",
    "LinkedIn",
    "joaol_mm@hotmail.com",
    "(48) 996330209"
];
    
function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, {textEnglish, textPortuguese});
}

export default textSelector;
