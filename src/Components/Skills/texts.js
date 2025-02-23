function textSelector(language, textPosition) {    
    const skillsTextPortuguese = [
        "Habilidades"
    ];

    const skillsTextEnglish = [
        "Skills"
    ];

    switch (language) {
        case "portuguese":
            return skillsTextPortuguese[textPosition];
        default:
            return skillsTextEnglish[textPosition];
    }
}

export default textSelector;
