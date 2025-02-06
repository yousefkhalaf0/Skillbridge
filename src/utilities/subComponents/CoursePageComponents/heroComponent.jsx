import React from 'react'
import { useSelector } from 'react-redux';
import {
    Grid, Typography
} from '../../muiComponents.js';
import './componentsStyle/heroComponent.css';


export default function HeroComponent() {
    const theme = useSelector((state) => state.themeReducer);

    return (
        <Grid className={`heroComponentContainer`} container spacing={2} >
            <Grid item md={6}>
                <Typography variant='h4'
                    sx={{
                        color: theme === 'dark' ? 'white' : '#262626',
                        fontWeight: 'bold'
                    }} >
                    Online Courses on Design and Development
                </Typography>
            </Grid>
            <Grid item md={6}>
                <Typography variant='body2'
                    sx={{
                        color: theme === 'dark' ? '#CFCFD0 ' : '#5B5B5C',
                    }} >
                    Welcome to our online course page, where you can enhance your skills in design and development. Choose from our carefully curated selection of 10 courses designed to provide you with comprehensive knowledge and practical experience. Explore the courses below and find the perfect fit for your learning journey.
                </Typography>
            </Grid>
        </Grid>
    );
}