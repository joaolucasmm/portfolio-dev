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
    "Petshop",
    "Blog page project about petshop using Single Page Application (SPA) concepts, utilizing API for post calls.",
    "FullDescription",
    "Fruta e Fruto",
    "Recipe blog landing page project using bootstrap for layout design.",
    "FullDescription",
    "My Links",
    "Page with links to all my online profiles.",
    "FullDescription",
    "Pokedex",
    "Functional Pokedex made with API.",
    "FullDescription",
    "TicTacToe",
    "TicTacToe game made in React.",
    "FullDescription"
];

function textSelector(language, textPosition) {
    return sendMessage(language, textPosition, { textEnglish, textPortuguese });
}

export default textSelector;
