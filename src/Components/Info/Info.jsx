import { Fragment, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import textSelector from './texts';

function card(index) {
   switch(index) {
        case 0:
            return (<FaGithub size='2em' />);
        case 1:
            return (<FaLinkedin size='2em' />);
        case 2:
            return (<FaEnvelope size='2em' />);
        case 3:
            return (<FaPhoneAlt size='2em' />);
    }
}

function Info({ styleSection, language }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemHover = (event, index) => {
        setSelectedIndex(index);
    };

    const handleListItemClick = (event, index) => {
        switch(index) {
            case 0:
                window.open("https://github.com/joaolucasmm", "_blank");
                break;
            case 1:
                window.open("https://www.linkedin.com/in/jo%C3%A3o-lucas-miranda-menegasso/", "_blank");
                break;
            default:
                console.log("To implement yet")
        }
    };

    return (
        <div id='info' className={styleSection}>
            <div className="info_container">
                <h1>{textSelector(language,0)}</h1>
                <div className='info_content'>
                    <Box className='info_list' sx={{ width: '100%', maxWidth: 300 }}>
                        <List>
                            {[textSelector(language, 1), textSelector(language, 2), textSelector(language, 3), textSelector(language, 4)].map((text, index) => (
                                <Fragment key={index}>
                                    <ListItem disablePadding className='info_button'>
                                        {card(index)}
                                        <ListItemButton 
                                            selected={selectedIndex === index}
                                            onMouseOver={(event) => handleListItemHover(event, index)}
                                            onClick={(event) => handleListItemClick(event, index)}
                                        >
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                    {index < 4 && <Divider variant="middle" />}
                                </Fragment>
                            ))}
                        </List>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Info;