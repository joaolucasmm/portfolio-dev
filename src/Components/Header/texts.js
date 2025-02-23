function textSelector(language, textPosition) {    
    const headerTextPortuguese = [
        "Habilidades",
        "Projetos",
        "Contato",
        "Currículo"
    ];

    const headerTextEnglish = [
        "Skills",
        "Projects",
        "Contact",
        "Resume"
    ];

    switch (language) {
        case "portuguese":
            return headerTextPortuguese[textPosition];
        default:
            return headerTextEnglish[textPosition];
    }
}

export default textSelector;
