import React from 'react'
import {
    Box, Button, Grid, Typography
} from '../../muiComponents.js';
import { useSelector } from 'react-redux';
import '../testimonialsCard/testimonialsCard.css';
import usr1_img from '../../../assets/images/usr1_img.svg';
import usr2_img from '../../../assets/images/usr2_img.svg';
import usr3_img from '../../../assets/images/usr3_img.svg';
import usr4_img from '../../../assets/images/usr4_img.svg';


const testimonials = [
    { img: usr1_img, usrName: 'Sarah L', description: 'The web design course provided a solid foundation for me. The instructors were knowledgeable and supportive, and the interactive learning environment was engaging. I highly recommend it!' },
    { img: usr2_img, usrName: 'Jason M', description: 'The UI/UX design course exceeded my expectations. The instructor\'s expertise and practical assignments helped me improve my design skills. I feel more confident in my career now. Thank you!' },
    { img: usr3_img, usrName: 'Emily R', description: 'The mobile app development course was fantastic! The step-by-step tutorials and hands-on projects helped me grasp the concepts easily. I\'m now building my own app. Great course!' },
    { img: usr4_img, usrName: 'Michael K', description: 'I enrolled in the graphic design course as a beginner, and it was the perfect starting point. The instructor\'s guidance and feedback improved my design abilities significantly. I\'m grateful for this course!' }
];

export default function TestimonialsCard() {
    const theme = useSelector((state) => state.themeReducer);

    return (
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <Typography className={`${theme}TestimonialsCardDescription`} variant='body1'>
                            {testimonial.description}
                        </Typography>
                        <Box className={`${theme}TestimonialsCardUserBox`}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box className='testimonialsImgBox'
                                        component="img"
                                        src={testimonial.img}
                                        alt="testimonialsImg" />
                                    <Typography className={`testimonialsCardUserName`} variant='subtitle1'>
                                        {testimonial.usrName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button className={`${theme}TestimonialsCardBtn`} variant="contained" sx={{ textTransform: 'none' }}>
                                        Read Full Story
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    )
}