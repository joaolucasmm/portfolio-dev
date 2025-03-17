import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Experiência"
]


const textEnglish = [
    "Hello, I am João Lucas!",
    "- Fullstack Developer.",
    "I have been studying physics engineering since 2017 at UFRGS. I started working with development when I took a technical course in mechatronics in 2014. In 2022, I switched to front end development and became a React developer. In 2023, I started an internship in the Rotation program at SAP where I worked as Technical Support, Quality Assurance Engineer, and currently I am a Software Engineer Intern."
]

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
