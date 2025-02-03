import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Box, Grid, Typography, ElectricBoltIcon, Button, Link
} from '../../utilities/muiComponents.js';
import '../homePage/homePage.css';
import linesIcon from '../../assets/icons/abstractLines.svg'
import ComercialBox from '../../utilities/subComponents/comercialBox/comercialBox.jsx';
import homeHeaderImg from '../../assets/images/homeHeaderImg.svg'

export default function HomePage() {
    const theme = useSelector((state) => state.themeReducer);
    const navigate = useNavigate();

    return (
        <main className='homePageContainer'>
            <Typography
                gutterBottom
                className='headerBox'
                variant="h4"
                component="div"
                sx={{
                    fontSize: { xs: '1.25rem', sm: '1.75rem', md: '2.5rem' }
                }}>
                <Box className='headerIconBox' ><ElectricBoltIcon className='headerIcon' /></Box>
                <Box className='headerBoxText disableSelecting' component="span" sx={{ color: '#E8A710' }}>Unlock</Box>
                <Box className='headerBoxText disableSelecting' component="span" sx={{ color: 'black' }}> Your Creative Potential</Box>
                <Box
                    className={`linesIcon ${theme}LinesIcon`}
                    component="img"
                    src={linesIcon}
                    alt="linesIcon" />
            </Typography>
            <Typography className={`${theme}HeaderSubText disableSelecting`} variant="h5" gutterBottom>
                with Online Design and Development Courses.
            </Typography>
            <Typography className={`${theme}HeaderSubSubText disableSelecting`} variant="subtitle1">
                Learn from Industry Experts and Enhance Your Skills.
            </Typography>
            <Button className={`${theme}ExploreCoursesBtn`} variant="contained" sx={{ textTransform: 'none' }}>
                Explore Courses
            </Button>
            <ComercialBox />
            <Box
                className='homeHeaderImg'
                component="img"
                src={homeHeaderImg}
                alt="homeHeaderImg"
                sx={{
                    width: { xs: '95%', md: '90%', lg: '85%' }
                }} />

            <Box className={`sectionsContainer`}
                sx={{ width: { xs: '95%', md: '90%', lg: '85%' } }}>
                <Box className={`disableSelecting`}>
                    <Typography className={`${theme}SectionsTitle`} variant='h4' gutterBottom>
                        Benefits
                    </Typography>
                    <Grid mb={9} container spacing={2} >
                        <Grid className={`${theme}SectionsSubTitle`} item sm={9} xs={12}>
                            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                <Button
                                    className="sectionBtn"
                                    variant="contained"
                                    sx={{ textTransform: 'none', }}>
                                    View All
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    CardSubComponentHere
                </Box>
            </Box>
        </main>
    )
}