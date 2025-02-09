import React from 'react';
import { useSelector } from 'react-redux';
import {
    Button, Grid, Typography
} from '../../muiComponents.js';
import './componentsStyle/heroComponent.css';

export default function HeroComponent({ course }) {
    const theme = useSelector((state) => state.themeReducer);

    if (!course) {
        return (
            <Grid className={`largeHeroComponentContainer`} container spacing={2}>
                <Grid item md={12}>
                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                        No course data available.
                    </Typography>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid className={`largeHeroComponentContainer`} container spacing={2}>
            <Grid item md={5}>
                <Typography variant='h4'
                    sx={{
                        color: theme === 'dark' ? 'white' : '#262626',
                        fontWeight: 'bold'
                    }}>
                    {course.course_name}
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
                    {course.course_description}
                </Typography>
            </Grid>
        </Grid>
    );
}