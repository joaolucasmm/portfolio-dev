import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Educação",
    "Engenharia Física",
    "Técnico em Mecatrônica",
    "2017 - Atualmente",
    "2014 - 2016",
    "UFRGS",
    "IFSC"
]


const textEnglish = [
    "Education",
    "Physics Engineering",
    "Mechatronics Technician",
    "2017 - Now",
    "2014 - 2016",
    "UFRGS",
    "IFSC"
]

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
