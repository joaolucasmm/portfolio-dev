import { useState } from "react";
import petshop from "../../Assets/Images/petshop.png";
import frutaEfruto from "../../Assets/Images/fruta-e-fruto.png";
import myLinks from "../../Assets/Images/my-links.png";
import pokedex from "../../Assets/Images/pokedex.png";
import tictactoe from "../../Assets/Images/screenshotTictactoe.png";
import textSelector from "./texts";
import Dialog from "./Dialog/Dialog";
import ProjectCard from "./ProjectCard/ProjectCard";

function Projects({ styleSection, language }) {
    const [open, setOpen] = useState(false);
    const [projectIndex, setProjectIndex] = useState(0);

    const handleClickOpen = (item) => {
        setOpen(true);
        setProjectIndex(item);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const projects = [
        {
            title: textSelector(language, 1),
            image: petshop,
            description: textSelector(language, 6),
        },
        {
            title: textSelector(language, 4),
            image: frutaEfruto,
            description: textSelector(language, 7),
        },
        {
            title: textSelector(language, 7),
            image: myLinks,
            description: textSelector(language, 8),
        },
        {
            title: textSelector(language, 10),
            image: pokedex,
            description: textSelector(language, 9),
        },
        {
            title: textSelector(language, 13),
            image: tictactoe,
            description: textSelector(language, 10),
        },
    ];

    return (
        <div className={styleSection}>
            <div className="container_projects">
                <h1 className="projects__title">{textSelector(language, 0)}</h1>
                <Dialog
                    open={open}
                    handleClose={handleClose}
                    projectIndex={projectIndex}
                    title={textSelector(language, projectIndex * 3 + 1)}
                    image={
                        projectIndex === 0
                            ? petshop
                            : projectIndex === 1
                            ? frutaEfruto
                            : projectIndex === 2
                            ? myLinks
                            : projectIndex === 3
                            ? pokedex
                            : tictactoe
                    }
                    fullDescription={textSelector(
                        language,
                        projectIndex * 3 + 3
                    )}
                />
                <span className="project_items">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            image={project.image}
                            language={language}
                            handleClickOpen={() => handleClickOpen(index)}
                            description={project.description}
                        />
                    ))}
                </span>
            </div>
        </div>
    );
}

export default Projects;
