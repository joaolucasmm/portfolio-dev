function textSelector(language, textPosition) {    
    var bannerText = "";

    const bannerTextPortuguese = [
        "Olá, eu sou João Lucas",
        "Desenvolvedor Front End!",
        "Sou estudante de engenharia física desde 2017 na UFRGS. Comecei a trabalhar com desenvolvimento ainda quando fiz curso técnico em mecatrônica em 2014. Em 2022 migrei para o desenvolvimento front end e me tornei desenvolvedor em React. Em 2023 comecei um estágio no programa de Rotação de áreas na SAP onde trabalhei como Suporte Técnico, Engenheiro de Qualidade e atualmente sou Estágiario de Engenharia de Software."
    ]

    const bannerTextEnglish = [
        "Hello, I am João Lucas",
        "Front End Developer!",
        "I have been studying physics engineering since 2017 at UFRGS. I started working with development when I took a technical course in mechatronics in 2014. In 2022, I switched to front end development and became a React developer. In 2023, I started an internship in the Rotation program at SAP where I worked as Technical Support, Quality Assurance Engineer, and currently I am a Software Engineer Intern."
    ]

    switch (language) {
        case "portuguese":
            bannerText = bannerTextPortuguese[textPosition];
            break;
            
        default:
            bannerText = bannerTextEnglish[textPosition];
            break;
    }
    console.log("the text getting here is ", language)
    return(bannerText);
}

export default textSelector;