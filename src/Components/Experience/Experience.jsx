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

function card(language, selectedIndex) {
    return(
        <Fragment>
            <CardContent>
                <div className='header'>
                    <Typography variant="h5" className='title'>
                        {textSelector(language, selectedIndex)}
                    </Typography>
                    <Typography variant="h7" className='date'>
                        {textSelector(language, selectedIndex+5)}
                    </Typography>
                </div>
                <Typography className='company' sx={{ color: 'text.secondary', mb: 1.5 }}>
                    {textSelector(language, selectedIndex+10)}
                </Typography>
                <Typography className='description' variant="body2">
                    {textSelector(language, selectedIndex+15)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Fragment>
    )
}

function Experience({ styleSection, language }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className={styleSection}>
            <div className="experience_container">
                <h1>{textSelector(language,0)}</h1>
                <div className='experience_content'>
                    <Box className='experience_list' sx={{ width: '100%', maxWidth: 300 }}>
                        <List>
                            {[textSelector(language, 1), textSelector(language, 2), textSelector(language, 3), textSelector(language, 4), textSelector(language, 5)].map((text, index) => (
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
                    <Box className='experience_display' sx={{ minWidth: 275, width: 1400 }}>
                        <Card variant="text" className='card'>{card(language, selectedIndex+1)}</Card>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Experience;