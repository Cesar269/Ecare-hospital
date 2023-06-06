import * as React from 'react';
import {useState,useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Inicio() {

    const post = {
        title: 'Bienvenid@ a E-care',
        description:
            "E-care es una plataforma digital destinada a los pacientes, doctores y personal de apoyo del hospital E-care, si no estás registrado ¡¡¿Qué esperas?!!",
        image: 'https://source.unsplash.com/random?wallpapers',
        imageText: 'Inicio',
        linkText: 'Agendar una cita',
    };

    return (
        <Container sx={{ mt: 5 }}>

            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${post.image})`,
                }}
            >
                {/* Increase the priority of the hero background image */}
                {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0,0,0,.3)',
                    }}
                />
                <Grid container>
                    <Grid item md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: { xs: 3, md: 6 },
                                pr: { md: 0 },
                            }}
                        >
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                {post.title}
                            </Typography>
                            <Typography variant="h6" color="inherit" paragraph>
                                {post.description}
                            </Typography>
                            <Button variant="contained" href="#">
                                {post.linkText}
                            </Button>

                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
