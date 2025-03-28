import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Projetos",
    "Meus Links",
    "16 de Novembro de 2022",
    "Página feita em ReactJS com links para todos meus perfis online.",
    "Descrição completa",
    "Pokedex",
    "18 de Novembro de 2022",
    "Pokedex para pesquisa de pokémons com consumo de API RESTful.",
    "Descrição completa",
    "Jogo da Velha",
    "24 de Julho de 2024",
    "Jogo da velha feito em ReactJS.",
    "Descrição completa",
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
    "FullDescription",
    "Pokedex",
    "November 18, 2022",
    "Functional Pokedex made with API.",
    "FullDescription",
    "TicTacToe",
    "July 24, 2024",
    "TicTacToe game made in React.",
    "FullDescription",
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
