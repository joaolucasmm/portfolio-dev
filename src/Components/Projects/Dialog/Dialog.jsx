import { Fragment } from "react";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { FaReact, FaJs, FaHtml5, FaCss3 } from "react-icons/fa";
import textSelector from "../texts";

function projectDialog({
    open,
    handleClose,
    title,
    image,
    projectURL,
    projectRepository,
    projectLinkedin = "https://www.linkedin.com/in/jo%C3%A3o-lucas-miranda-menegasso/",
    fullDescription,
    tags,
    handleTagSelection,
    darkMode,
    language,
}) {
    return (
        <Fragment>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
                maxWidth="xl"
            >
                <div className={"project_dialog " + (darkMode && "project_dialog_dark")}>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            <CloseIcon />
                        </Button>
                    </DialogActions>
                    <h2 className="dialog_title">{title}</h2>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-slide-description"
                            className={"dialog_content " + (darkMode && "dialog_content_dark")}
                        >
                            <CardMedia
                                component="img"
                                image={image}
                                alt="Screenshot"
                                className="dialog_rows dialog_media"
                            />
                            <span className="dialog_rows dialog_description">
                                <section>{fullDescription}</section>
                                <section className="dialog_buttons">
                                    <Button
                                        className={"button " + (darkMode && "button_dark")}
                                        onClick={() =>
                                            window.open(projectURL, "_blank")
                                        }
                                    >
                                        <LinkIcon />
                                        {textSelector(language, 17)}
                                    </Button>
                                    <Button
                                        className={"button " + (darkMode && "button_dark")}
                                        onClick={() =>
                                            window.open(
                                                projectRepository,
                                                "_blank"
                                            )
                                        }
                                    >
                                        <GitHubIcon />
                                        {textSelector(language, 18)}
                                    </Button>
                                    <Button
                                        className={"button " + (darkMode && "button_dark")}
                                        onClick={() =>
                                            window.open(
                                                projectLinkedin,
                                                "_blank"
                                            )
                                        }
                                    >
                                        <LinkedInIcon />
                                        {textSelector(language, 19)}
                                    </Button>
                                </section>
                                <section className="dialog_tags">
                                    {tags &&
                                        Object.values(tags).map(
                                            (tag, index) => {
                                                if (tag === "ReactJS") {
                                                    return (
                                                        <Chip
                                                            key={index}
                                                            label={tag}
                                                            icon={<FaReact />}
                                                            variant="outlined"
                                                            className={"tag " + (darkMode && "tag_dark")}
                                                            onClick={() =>
                                                                handleTagSelection(
                                                                    tag
                                                                )
                                                            }
                                                        />
                                                    );
                                                } else if (
                                                    tag === "JavaScript"
                                                ) {
                                                    return (
                                                        <Chip
                                                            key={index}
                                                            label={tag}
                                                            icon={<FaJs />}
                                                            variant="outlined"
                                                            className={"tag " + (darkMode && "tag_dark")}
                                                            onClick={() =>
                                                                handleTagSelection(
                                                                    tag
                                                                )
                                                            }
                                                        />
                                                    );
                                                } else if (tag === "HTML") {
                                                    return (
                                                        <Chip
                                                            key={index}
                                                            label={tag}
                                                            icon={<FaHtml5 />}
                                                            variant="outlined"
                                                            className={"tag " + (darkMode && "tag_dark")}
                                                            onClick={() =>
                                                                handleTagSelection(
                                                                    tag
                                                                )
                                                            }
                                                        />
                                                    );
                                                } else if (tag === "CSS") {
                                                    return (
                                                        <Chip
                                                            key={index}
                                                            label={tag}
                                                            icon={<FaCss3 />}
                                                            variant="outlined"
                                                            className={"tag " + (darkMode && "tag_dark")}
                                                            onClick={() =>
                                                                handleTagSelection(
                                                                    tag
                                                                )
                                                            }
                                                        />
                                                    );
                                                } else {
                                                    return (
                                                        <Chip
                                                            key={index}
                                                            label={tag}
                                                            variant="outlined"
                                                            className={"tag " + (darkMode && "tag_dark")}
                                                            onClick={() =>
                                                                handleTagSelection(
                                                                    tag
                                                                )
                                                            }
                                                        />
                                                    );
                                                }
                                            }
                                        )}
                                </section>
                            </span>
                        </DialogContentText>
                    </DialogContent>
                </div>
            </Dialog>
        </Fragment>
    );
}

export default projectDialog;
