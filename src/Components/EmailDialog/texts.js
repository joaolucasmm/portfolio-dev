import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Me envie uma menssagem abaixo! (Não se preocupe, eu respondo meus e-mails mais rápido que o Whatsapp)",
    "Nome",
    "Título",
    "E-mail",
    "Mensagem",
    "Enviar",
]


const textEnglish = [
    "Send me a message below! (Don't worry, I reply to my emails faster than Whatsapp)",
    "Name",
    "Title",
    "E-mail",
    "Message",
    "Send",
]

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
