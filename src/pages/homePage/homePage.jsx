import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShowScroll, toggleShowAllBenefits, toggleShowAllTestimonials } from '../../utilities/redux/store.jsx';
import {
    Box, Grid, Typography, ElectricBoltIcon, Button, KeyboardArrowUpIcon
} from '../../utilities/muiComponents.js';
import { ComercialBox, BenefitsCard, SmallCourseCard, TestimonialsCard } from '../../utilities/subComponentsLinks.js';
import '../homePage/homePage.css';
import linesIcon from '../../assets/icons/abstractLines.svg'
import homeHeaderImg from '../../assets/images/homeHeaderImg.svg'


export default function HomePage() {
    const theme = useSelector((state) => state.themeReducer);
    const showScroll = useSelector((state) => state.scrollReducer.showScroll);
    const showAllBenefits = useSelector((state) => state.showAllBenefitsReducer);
    const showAllTestimonials = useSelector((state) => state.showAllTestimonialsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const coursesRef = useRef(null);

    const checkScrollTop = () => {
        const shouldShow = window.pageYOffset > 400;
        if (shouldShow !== showScroll) {
            dispatch(setShowScroll(shouldShow));
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [showScroll, dispatch]);
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className='homePageContainer'>

            {/* hero section */}
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
            <Button className={`${theme}ExploreCoursesBtn`} variant="contained" sx={{ textTransform: 'none' }}
                onClick={() => {
                    coursesRef.current.scrollIntoView();
                }}>
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

            {/* Benefits section */}
            <Box className={`sectionsContainer`}
                sx={{ width: { xs: '95%', md: '90%', lg: '85%' } }}>
                <Box className={`disableSelecting`}>
                    <Typography className={`${theme}SectionsTitle`} variant='h4' gutterBottom>
                        Benefits
                    </Typography>
                    <Grid mb={6} container spacing={2} >
                        <Grid className={`${theme}SectionsSubTitle`} item sm={9} xs={12}>
                            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                <Button
                                    className="sectionBtn"
                                    variant="contained"
                                    sx={{ textTransform: 'none' }}
                                    onClick={() => dispatch(toggleShowAllBenefits())}>
                                    {showAllBenefits ? 'Collapse' : 'View All'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <BenefitsCard showAll={showAllBenefits} />
                </Box>
            </Box>

            {/* Course section */}
            <Box ref={coursesRef} className={`sectionsContainer`}
                sx={{ width: { xs: '95%', md: '90%', lg: '85%' } }}>
                <Box className={`disableSelecting`}>
                    <Typography className={`${theme}SectionsTitle`} variant='h4' gutterBottom>
                        Our Courses
                    </Typography>
                    <Grid mb={6} container spacing={2} >
                        <Grid className={`${theme}SectionsSubTitle`} item sm={9} xs={12}>
                            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.
                        </Grid>
                    </Grid>
                    <SmallCourseCard />
                </Box>
            </Box>

            {/* Testimonials section */}
            <Box className={`sectionsContainer`}
                sx={{ width: { xs: '95%', md: '90%', lg: '85%' } }}>
                <Box className={`disableSelecting`}>
                    <Typography className={`${theme}SectionsTitle`} variant='h4' gutterBottom>
                        Our Testimonials
                    </Typography>
                    <Grid mb={6} container spacing={2} >
                        <Grid className={`${theme}SectionsSubTitle`} item sm={9} xs={12}>
                            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum eget habitasse in velit fringilla feugiat senectus in.
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                <Button
                                    className="sectionBtn"
                                    variant="contained"
                                    sx={{ textTransform: 'none' }}
                                    onClick={() => dispatch(toggleShowAllTestimonials())}>
                                    {showAllTestimonials ? 'Collapse' : 'View All'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <TestimonialsCard showAll={showAllTestimonials} />
                </Box>
            </Box>

            {/* FAQ's section */}
            {/* <Box className={`sectionsContainer`}
                sx={{ width: { xs: '95%', md: '90%', lg: '85%' } }}>
                <Box className={`disableSelecting`}>
                    FAQ's card here
                </Box>
            </Box> */}


            {showScroll && (
                <Button
                    onClick={scrollTop}
                    className='homePageScrollBtn'>
                    <KeyboardArrowUpIcon />
                </Button>
            )}
        </main>
    )
}