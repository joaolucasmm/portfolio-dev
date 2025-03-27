import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "João Lucas Miranda Menegasso",
    "Desenvolvedor Fullstack",
    "Sou estudante de engenharia física desde 2017 na UFRGS. Comecei a trabalhar com desenvolvimento ainda quando fiz curso técnico em mecatrônica em 2014. Em 2022 migrei para o desenvolvimento front end e me tornei desenvolvedor em React. Em 2023 comecei um estágio no programa de Rotação de áreas na SAP onde trabalhei como Suporte Técnico, Engenheiro de Qualidade e Desenvolvedor de Software. No momento estou aberto para novas oportunidades como Desenvolvedor Fullstack."
]

const textEnglish = [
    "João Lucas Miranda Menegasso",
    "Fullstack Developer",
    "I have been studying physics engineering since 2017 at UFRGS. I started working with development when I took a technical course in mechatronics in 2014. In 2022, I switched to front end development and became a React developer. In 2023, I started an internship in the Rotation program at SAP where I worked as Technical Support, Quality Assurance Engineer and Software Engineer. Currently I am open to work and looking for new opportunities as a Fullstack Developer."
]

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;