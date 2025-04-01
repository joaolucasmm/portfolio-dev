import { useState, Fragment } from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import textSelector from "./texts";

function card(language, selectedIndex, darkMode) {
    return (
        <Fragment>
            <CardContent>
                <div className="header">
                    <Typography variant="h5" className="title">
                        {textSelector(language, selectedIndex)}
                    </Typography>
                    <Typography variant="h7" className="date">
                        {textSelector(language, selectedIndex + 5)}
                    </Typography>
                </div>
                <Typography className="company" sx={{ mb: 1.5 }}>
                    {textSelector(language, selectedIndex + 10)}
                </Typography>
                <Typography className="description" variant="body2">
                    {textSelector(language, 14 + selectedIndex * 2)}
                </Typography>
                <Typography className="description" variant="body2">
                    <p>{textSelector(language, 14 + selectedIndex * 2 + 1)}</p>
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    className={"learn_more " + (darkMode && "learn_more_dark")}
                    onClick={() =>
                        window.open(
                            selectedIndex < 4
                                ? "https://www.sap.com/about/company.html"
                                : "http://www.ufrgs.br/ufrgs/ensino/apresentacao",
                            "_blank"
                        )
                    }
                >
                    {textSelector(language, 26)}
                </Button>
            </CardActions>
        </Fragment>
    );
}

function Experience({ styleSection, language, darkMode }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div id="experience" className={styleSection}>
            <div className="experience_container">
                <h1>{textSelector(language, 0)}</h1>
                <div
                    className={
                        "experience_content " +
                        (darkMode && "experience_content_dark")
                    }
                >
                    <Box
                        className="experience_list"
                    >
                        <List>
                            {[
                                textSelector(language, 1),
                                textSelector(language, 2),
                                textSelector(language, 3),
                                textSelector(language, 4),
                                textSelector(language, 5),
                            ].map((text, index) => (
                                <Fragment key={index}>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            selected={selectedIndex === index}
                                            onClick={(event) =>
                                                handleListItemClick(
                                                    event,
                                                    index
                                                )
                                            }
                                            sx={{
                                                borderLeft:
                                                    selectedIndex === index
                                                        ? "4px solid black"
                                                        : "none",
                                            }}
                                        >
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                    {index < 4 && <Divider variant="middle" />}
                                </Fragment>
                            ))}
                        </List>
                    </Box>
                    <Box
                        className="experience_display"
                    >
                        <Card
                            variant="text"
                            className={"card " + (darkMode && "card_dark")}
                        >
                            {card(language, selectedIndex + 1, darkMode)}
                        </Card>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Experience;
