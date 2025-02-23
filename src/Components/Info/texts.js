function textSelector(language, textPosition) {    
    const infoTextPortuguese = [
        "Contato",
        "GitHub",
        "LinkedIn",
        "joaol_mm@hotmail.com",
        "(48) 996330209"
    ];

    const infoTextEnglish = [
        "Contact info",
        "GitHub",
        "LinkedIn",
        "joaol_mm@hotmail.com",
        "(48) 996330209"
    ];

    switch (language) {
        case "portuguese":
            return infoTextPortuguese[textPosition];
        default:
            return infoTextEnglish[textPosition];
    }
}

export default textSelector;
