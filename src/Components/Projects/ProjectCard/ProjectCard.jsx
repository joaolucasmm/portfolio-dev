import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import textSelector from "../texts";
import variables from "../../UI/variables.scss";
import { Fab } from "@mui/material";

function projectDialog({
    projectKey,
    title,
    date,
    image,
    language,
    projectURL,
    projectRepository,
    projectLinkedin = "https://www.linkedin.com/in/jo%C3%A3o-lucas-miranda-menegasso/",
    description,
    handleClickOpen,
    darkMode,
}) {
    const handleOpenSettings = (projectKey, event) => {
        event.stopPropagation();
        const settings = document.querySelector(
            `.project_settings${projectKey}`
        );
        settings.style.display =
            settings.style.display === "none" ? "block" : "none";
    };

    const handleCardClick = (projectKey) => {
        const settings = document.querySelector(
            `.project_settings${projectKey}`
        );
        settings.style.display = "none";
    };

    return (
        <Card
            sx={{ width: 345, position: "relative", bgcolor: variables.color1 }}
            className={"project_card " + (darkMode && "dark")}
            onClick={() => handleCardClick(projectKey)}
        >
            <span className={"project_header " + (darkMode && "dark")}>
                <Fab
                    size="small"
                    aria-label="add"
                    onClick={(event) => handleOpenSettings(projectKey, event)}
                    className="project_settings glass-background"
                >
                    <MoreVertIcon />
                </Fab>
                <h3 className="card_title">{title}</h3>
                <h4 className="card_subtitle">{date}</h4>
            </span>
            <nav
                aria-label="settings"
                className={"project_settings" + projectKey}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LinkIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={textSelector(language, -7)}
                                onClick={() => {
                                    window.open(projectURL, "_blank");
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <GitHubIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={textSelector(language, -6)}
                                onClick={() => {
                                    window.open(projectRepository, "_blank");
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LinkedInIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={textSelector(language, -5)}
                                onClick={() => {
                                    window.open(projectLinkedin, "_blank");
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Screenshot"
                className="project_image"
            />
            <CardContent>
                <p className={darkMode && "dark"}>{description}</p>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="info" className="card_icon">
                    <InfoIcon onClick={() => handleClickOpen()} />
                </IconButton>
                <IconButton
                    aria-label="share"
                    onClick={() =>
                        window.open(
                            "https://api.whatsapp.com/send?text=" + projectURL,
                            "_blank"
                        )
                    }
                >
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
export default projectDialog;
