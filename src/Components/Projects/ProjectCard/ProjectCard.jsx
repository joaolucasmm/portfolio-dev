import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
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
}) {
    const handleOpenSettings = (projectKey, event) => {
        event.stopPropagation();
        const settings = document.querySelector(`.project_settings${projectKey}`);
        settings.style.display = settings.style.display === "none" ? "block" : "none";
    };

    const handleCardClick = (projectKey) => {
        const settings = document.querySelector(`.project_settings${projectKey}`);
        settings.style.display = "none";
    };

    return (
        <Card sx={{ width: 345, position: 'relative', bgcolor:variables.color1}} onClick={() => handleCardClick(projectKey)}>
            <CardHeader
                action={
                    <IconButton
                        aria-label="settings"
                        onClick={(event) => handleOpenSettings(projectKey, event)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
                subheader={date}
            />
            <nav aria-label="settings" className={"project_settings" + projectKey}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LinkIcon />
                            </ListItemIcon>
                            <ListItemText primary={textSelector(language,13)} onClick={() => {window.open(projectURL, "_blank")}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <GitHubIcon />
                            </ListItemIcon>
                            <ListItemText primary={textSelector(language,14)} onClick={() => {window.open(projectRepository, "_blank")}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LinkedInIcon />
                            </ListItemIcon>
                            <ListItemText primary={textSelector(language,15)} onClick={() => {window.open(projectLinkedin, "_blank")}}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Screenshot"
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <InfoIcon onClick={() => handleClickOpen()} />
                </IconButton>
                <IconButton aria-label="share" onClick={() => window.open("https://api.whatsapp.com/send?text=" + projectURL, "_blank")}>
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
export default projectDialog;
