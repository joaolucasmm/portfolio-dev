import { useState } from "react";
import petshop from "../../Assets/Images/petshop.png";
import frutaEfruto from "../../Assets/Images/fruta-e-fruto.png";
import { FaReact, FaJs, FaHtml5, FaCss3 } from "react-icons/fa";
import myLinks from "../../Assets/Images/my-links.png";
import pokedex from "../../Assets/Images/pokedex.png";
import tictactoe from "../../Assets/Images/screenshotTictactoe.png";
import textSelector from "./texts";
import Dialog from "./Dialog/Dialog";
import ProjectCard from "./ProjectCard/ProjectCard";
import Chip from "@mui/material/Chip";

function Projects({ styleSection, language }) {
    const [open, setOpen] = useState(false);
    const [projectIndex, setProjectIndex] = useState(0);
    const [tags, setTags] = useState(["All"]);

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
            date: textSelector(language, 2),
            image: myLinks,
            description: textSelector(language, 3),
            projectURL: "https://joaolucasmm.github.io/my-links/",
            projectRepository: "https://github.com/joaolucasmm/my-links",
            fullDescription: textSelector(language, 4),
            tags: {
                0: "ReactJS",
                1: "HTML",
                2: "CSS",
                3: "JavaScript",
            },
        },
        {
            title: textSelector(language, 1 * 4 + 1),
            date: textSelector(language, 1 * 4 + 2),
            image: pokedex,
            description: textSelector(language, 1 * 4 + 3),
            projectURL: "https://joaolucasmm.github.io/Pokedex/",
            projectRepository: "https://github.com/joaolucasmm/Pokedex",
            fullDescription: textSelector(language, 1 * 4 + 4),
            tags: {
                0: "ReactJS",
                1: "API RESTful",
                2: "HTML",
                3: "CSS",
                4: "JavaScript",
            },
        },
        {
            title: textSelector(language, 2 * 4 + 1),
            date: textSelector(language, 2 * 4 + 2),
            image: tictactoe,
            description: textSelector(language, 2 * 4 + 3),
            projectURL: "https://joaolucasmm.github.io/TicTacToe/",
            projectRepository: "https://github.com/joaolucasmm/TicTacToe",
            fullDescription: textSelector(language, 2 * 4 + 4),
            tags: {
                0: "ReactJS",
                1: "HTML",
                2: "CSS",
                3: "JavaScript",
            },
        },
    ];

    const handleTagSelection = (tag) => {
        setTags((prevTags) =>
            prevTags === "All" ? [tag] : prevTags.includes(tag) ? prevTags : prevTags.filter(t => t !== "All").concat(tag)
        );
        handleClose();
    };
    const handleTagDelete = (tag) => {
        setTags((prevTags) => prevTags.filter((item) => item !== tag));
        tags.length === 1 && setTags("All");
    };

    const filteredProjects =
        tags.includes("All")
            ? projects
            : projects.filter((project) =>
                  tags.some((tag) => Object.values(project.tags).includes(tag))
              );

    return (
        <div className={styleSection}>
            <div className="container_projects">
                <h1 className="projects__title">{textSelector(language, 0)}</h1>
                <Dialog
                    open={open}
                    handleClose={handleClose}
                    title={projects[projectIndex].title}
                    image={projects[projectIndex].image}
                    projectURL={projects[projectIndex].projectURL}
                    projectRepository={projects[projectIndex].projectRepository}
                    projectLinkedin={projects[projectIndex].projectLinkedin}
                    fullDescription={projects[projectIndex].fullDescription}
                    tags={projects[projectIndex].tags}
                    handleTagSelection={handleTagSelection}
                />
                <span className="project_tags">
                    <Chip
                        label="All"
                        variant={tags.includes("All") ? undefined : "outlined"}
                        className="tag"
                        onClick={() => setTags("All")}
                    />
                    <Chip
                        label="ReactJS"
                        icon={<FaReact />}
                        variant={tags.includes("ReactJS") ? undefined : "outlined"}
                        className="tag"
                        onClick={() => handleTagSelection("ReactJS")}
                        onDelete={Object.values(tags).includes("ReactJS") ? () => handleTagDelete("ReactJS") : undefined}
                    />
                    <Chip
                        label="API RESTful"
                        variant={tags.includes("API RESTful") ? undefined : "outlined"}
                        className="tag"
                        onClick={() => handleTagSelection("API RESTful")}
                        onDelete={Object.values(tags).includes("API RESTful") ? () => handleTagDelete("API RESTful") : undefined}
                        />
                    <Chip
                        label="HTML"
                        icon={<FaHtml5 />}
                        variant={tags.includes("HTML") ? undefined : "outlined"}
                        className="tag"
                        onClick={() => handleTagSelection("HTML")}
                        onDelete={Object.values(tags).includes("HTML") ? () => handleTagDelete("HTML") : undefined}
                        />
                    <Chip
                        label="CSS"
                        icon={<FaCss3 />}
                        variant={tags.includes("CSS") ? undefined : "outlined"}
                        className="tag"
                        onClick={() => handleTagSelection("CSS")}
                        onDelete={Object.values(tags).includes("CSS") ? () => handleTagDelete("CSS") : undefined}
                        />
                    <Chip
                        label="JavaScript"
                        icon={<FaJs />}
                        variant={tags.includes("JavaScript") ? undefined : "outlined"}
                        className="tag"
                        onClick={() => handleTagSelection("JavaScript")}
                        onDelete={Object.values(tags).includes("JavaScript") ? () => handleTagDelete("JavaScript") : undefined}
                    />
                </span>
                <span className="project_items">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            projectKey={index}
                            title={project.title}
                            date={project.date}
                            image={project.image}
                            language={language}
                            projectURL={project.projectURL}
                            projectRepository={project.projectRepository}
                            projectLinkedin={project.projectLinkedin}
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
