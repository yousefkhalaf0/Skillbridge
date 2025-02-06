import React from 'react'
import { useSelector } from 'react-redux';
import {
    Box,
    Grid, Typography, Button
} from '../../muiComponents.js';
import './componentsStyle/largeCourseCard.css';
import courseImg from '../../../assets/images/course1_img.svg';


export default function LargeCourseCard() {
    const theme = useSelector((state) => state.themeReducer);

    return (
        <Box className={`${theme}LargeCourseCardContainer`}>
            <Typography className={`${theme}CourseTitle`} variant='h6' gutterBottom>
                Web Design Fundamentals
            </Typography>
            <Grid mb={4} container spacing={2} >
                <Grid className={`courseDiscreption`} item sm={9} xs={12}>
                    Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.
                </Grid>
                <Grid item sm={3} xs={12}>
                    <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                        <Button
                            className={`viewCourseBtn`}
                            variant="contained"
                            sx={{ textTransform: 'none' }}>
                            View Course
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Grid item xs={12} sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <Grid container spacing={1.5} >
                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box
                                    component="img"
                                    src={courseImg}
                                    alt="courseImg"
                                    sx={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box
                                    component="img"
                                    src={courseImg}
                                    alt="courseImg"
                                    sx={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </Grid>
                            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box
                                    component="img"
                                    src={courseImg}
                                    alt="courseImg"
                                    sx={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                            </Grid>
                        </Grid>

                        <Grid className={`largeCourseCardRow`} container spacing={2} >
                            <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                                <Typography className={`${theme}LargeWeeksLevelBox`} variant='caption' sx={{ marginRight: 1 }}>
                                    4 Weeks
                                </Typography>
                                <Typography className={`${theme}LargeWeeksLevelBox`} variant='caption'>
                                    Beginner
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                <Typography className={`${theme}LargeVendor`} variant='subtitle1'>
                                    By John Smith
                                </Typography>
                            </Grid>
                        </Grid>
                        
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}