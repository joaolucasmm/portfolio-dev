import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CodeIcon from '@mui/icons-material/Code';
import textSelector from './texts';

function Services({ styleSection, language }) {
    return (
        <div className={styleSection}>
            <div className='services_container'>
                <h1>{textSelector(language, 0)}</h1>
                <div className='services_content'>
                <Card sx={{ maxWidth: 345 }}>
                    <CodeIcon />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {textSelector(language, 1)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {textSelector(language, 2)}
                            Desenvolvo sites profissionais, blogs, SaaS, landing pages, ecommerce e entre outros websites.
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CodeIcon />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {textSelector(language, 3)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {textSelector(language, 4)}
                            Desenvolvo APIs profissionais, blogs, SaaS, landing pages, ecommerce e entre outros websites.
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 345 }}>
                    <CodeIcon />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {textSelector(language, 5)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {textSelector(language, 6)}
                            Desenvolvo sites profissionais, blogs, SaaS, landing pages, ecommerce e entre outros websites.
                        </Typography>
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
    );
}

export default Services;