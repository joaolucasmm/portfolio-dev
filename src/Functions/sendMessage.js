function sendMessage(language, textPosition, text) {
    switch (language) {
        case "portuguese":
            return text.textPortuguese[textPosition];
        default:
            return text.textEnglish[textPosition];
    }
}

export default sendMessage;