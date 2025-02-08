import React from 'react'
import { useSelector } from 'react-redux';
import {
    Button, Grid, Typography
} from '../../muiComponents.js';
import './componentsStyle/heroComponent.css';


export default function HeroComponent() {
    const theme = useSelector((state) => state.themeReducer);

    return (
        <Grid className={`largeHeroComponentContainer`} container spacing={2} >
            <Grid item md={5}>
                <Typography variant='h4'
                    sx={{
                        color: theme === 'dark' ? 'white' : '#262626',
                        fontWeight: 'bold'
                    }}>
                    UI/UX Design Course
                </Typography>
                <Button
                    className={`${theme}EnrollBtn`}
                    variant="contained"
                    sx={{ textTransform: 'none' }}>
                    Enroll the course
                </Button>
            </Grid>
            <Grid item md={7}>
                <Typography variant='body2'
                    sx={{
                        color: theme === 'dark' ? '#CFCFD0 ' : '#5B5B5C',
                    }} >
                    Welcome to our UI/UX Design course! This comprehensive program will equip you with the knowledge and skills to create exceptional user interfaces (UI) and enhance user experiences (UX). Dive into the world of design thinking, wireframing, prototyping, and usability testing. Below is an overview of the curriculum                </Typography>
            </Grid>
        </Grid>
    );
}