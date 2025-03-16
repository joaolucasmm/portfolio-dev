import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
]


const textEnglish = [
    "Services",
    "Fullstack development",
    "I develop websites, servers, APIs [...]",
    "Quality Assurance",
    "",
    "Consulting",
    "Consult"
]

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
