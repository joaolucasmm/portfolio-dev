import { useState, Fragment } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import textSelector from './texts';

function card(language, selectedIndex, darkMode) {
    return(
        <Fragment>
            <CardContent>
                <div className='header'>
                    <Typography variant="h5" className='title'>
                        {textSelector(language, selectedIndex)}
                    </Typography>
                    <Typography variant="h7" className='date'>
                        {textSelector(language, selectedIndex+2)}
                    </Typography>
                </div>
                <Typography className='company' sx={{ mb: 1.5 }}>
                    {textSelector(language, selectedIndex+4)}
                </Typography>
                <Typography className='description' variant="body2">
                    {textSelector(language, selectedIndex+6)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" className={"learn_more " + (darkMode && "learn_more_dark")} onClick={() => window.open((selectedIndex === 2) ? "https://www.ifsc.edu.br/tecnicos-integrados/-/visualizar/mecatronica/Campus-Criciuma/172/228/nO9EQhPgKNer" : "https://engfis.if.ufrgs.br/index.php/P%C3%A1gina_principal", "_blank")}>{textSelector(language, 9)}</Button>
            </CardActions>
        </Fragment>
    )
}

function Education({ styleSection, language, darkMode }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div id='education' className={styleSection}>
            <div className="education_container">
                <h1>{textSelector(language,0)}</h1>
                <div className={'education_content ' + (darkMode && "education_content_dark")}>
                    <Box className='education_list'>
                        <List>
                            {[textSelector(language, 1), textSelector(language, 2)].map((text, index) => (
                                <Fragment key={index}>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            selected={selectedIndex === index}
                                            onClick={(event) => handleListItemClick(event, index)}
                                            sx={{ borderLeft: selectedIndex === index ? '4px solid black' : 'none' }}
                                        >
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                    {index < 4 && <Divider variant="middle" />}
                                </Fragment>
                            ))}
                        </List>
                    </Box>
                    <Box className='education_display'>
                        <Card variant="text" className={'card ' + (darkMode && 'card_dark')}>{card(language, selectedIndex+1, darkMode)}</Card>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Education;