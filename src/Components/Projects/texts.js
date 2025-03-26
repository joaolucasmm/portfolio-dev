import sendMessage from "../../Functions/sendMessage";

const textPortuguese = [
    "Projetos",
    "Projeto de página de blog sobre pets usando conceitos de Single Page Application (SPA), utilizando API para chamada de posts.",
    "Projeto de landpage de blog de receitas utilizando bootstrap para montagem de layout.",
    "Página com links para todos meus perfis online.",
    "Pokedex feita com API.",
    "Jogo da velha feito em React."
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
    "FullDescription"
];

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
