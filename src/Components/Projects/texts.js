function textSelector(language, textPosition) {    
    const projectsTextPortuguese = [
        "Projetos",
        "Blog page project about petshop using Single Page Application (SPA) concepts, utilizing API for post calls.",
        "Recipe blog landing page project using bootstrap for layout design.",
        "Page with links to all my online profiles.",
        "Functional Pokedex made with API.",
        "TicTacToe game made in React."
    ];

    const projectsTextEnglish = [
        "Projects",
        "Projeto de página de blog sobre pets usando conceitos de Single Page Application (SPA), utilizando API para chamada de posts.",
        "Projeto de landpage de blog de receitas utilizando bootstrap para montagem de layout.",
        "Página com links para todos meus perfis online.",
        "Pokedex feita com API.",
        "Jogo da velha feito em React."
    ];

    switch (language) {
        case "portuguese":
            return projectsTextPortuguese[textPosition];
        default:
            return projectsTextEnglish[textPosition];
    }
}

export default textSelector;
