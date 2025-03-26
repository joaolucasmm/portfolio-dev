import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
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

import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

function projectDialog({
    projectKey,
    title,
    date,
    image,
    language,
    projectURL,
    projectRepository,
    projectLinkedin,
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
        <Card sx={{ width: 345, position: 'relative' }} onClick={() => handleCardClick(projectKey)}>
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
                            <ListItemText primary="Link" onClick={() => {window.open(projectURL, "_blank")}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <GitHubIcon />
                            </ListItemIcon>
                            <ListItemText primary="Repositório" onClick={() => {window.open(projectRepository, "_blank")}}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LinkedInIcon />
                            </ListItemIcon>
                            <ListItemText primary="Post" onClick={() => {window.open(projectLinkedin, "_blank")}}/>
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
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}
export default projectDialog;
