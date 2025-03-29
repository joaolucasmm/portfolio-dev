import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Projetos",
    "Meus Links",
    "16 de Novembro de 2022",
    "Página feita em ReactJS com links para todos meus perfis online.",
    "Projeto front end simples, feito com ReactJS, para demonstrar como estruturas podem ter o layout organizado com um modelo flebox. O projeto é responsivo e foi publicado no Github Pages.",
    "Pokedex",
    "18 de Novembro de 2022",
    "Pokedex para pesquisa de pokémons com consumo de API RESTful.",
    "Projeto front end construído com ReactJS e Javascript, consumindo uma API RESTful para obter dados de Pokémons. O projeto é responsivo e foi publicado no Github Pages.",
    "Jogo da Velha",
    "24 de Julho de 2024",
    "Jogo da velha feito em ReactJS.",
    "Projeto front end, feito com ReactJS and Javascript, para demonstrar a construção de um jogo simples usando lógica de programação básica e variáveis de estado ReactJS. O projeto é resposivo e foi publicado no Github Pages.",
    "Link",
    "Repositório",
    "Post",
    "Todos",
    "Site do Projeto",
    "Repositório no GitHub",
    "Post no LinkedIn"
];

const textEnglish = [
    "Projects",
    "My Links",
    "November 16, 2022",
    "Page with links to all my online profiles.",
    "Front end simple project, built with ReactJS, to demonstrate how structures can have an organized layout with a flexbox model. The project is responsive and was deployed on Github Pages.",
    "Pokedex",
    "November 18, 2022",
    "Functional Pokedex made with API.",
    "Front end project built with ReactJS and Javascript, consuming a RESTful API to fetch data from Pokémons. The project is responsive and was deployed on Github Pages.",
    "TicTacToe",
    "July 24, 2024",
    "TicTacToe game made in React.",
    "Front end project, built with ReactJS and Javascript, to demonstrate the construction of a simple game using basic native code logics and ReactJS state variables. The project is responsive and was deployed on Github Pages.",
    "Link",
    "Repository",
    "Post",
    "All",
    "Project Website",
    "GitHub Repository",
    "LinkedIn Post"
];

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
