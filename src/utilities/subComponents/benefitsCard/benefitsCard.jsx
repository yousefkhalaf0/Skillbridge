import React from 'react'
import {
    Box, Grid, Typography, ArrowOutwardIcon
} from '../../muiComponents.js';
import { useSelector } from 'react-redux';
import '../benefitsCard/benefitsCard.css';

const benefits = [
    { num: '01', title: 'Flexible Learning Schedule', description: 'Fit your coursework around your existing commitments and obligations.' },
    { num: '02', title: 'Expert Instruction', description: 'Learn from industry experts who have hands-on experience in design and development.' },
    { num: '03', title: 'Diverse Course Offerings', description: 'Explore a wide range of design and development courses covering various topics.' },
    { num: '04', title: 'Updated Curriculum', description: 'Access courses with up-to-date content reflecting the latest trends and industry practices.' },
    { num: '05', title: 'Practical Projects and Assignments', description: 'Develop a portfolio showcasing your skills and abilities to potential employers.' },
    { num: '06', title: 'Interactive Learning Environment', description: 'Collaborate with fellow learners, exchanging ideas and feedback to enhance your understanding.' }
];

export default function BenefitsCard({ showAll }) {
    const theme = useSelector((state) => state.themeReducer);

    return (
        <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {benefits.slice(0, showAll ? benefits.length : 3).map((benefit, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index} sx={{ display: 'flex' }}>
                    <Box className={`${theme}BenefitsCard`} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <Typography className={`benefitsCardText cardTitle`} variant='h2' gutterBottom>
                            {benefit.num}
                        </Typography>
                        <Typography className={`benefitsCardText`} variant='h6' gutterBottom>
                            {benefit.title}
                        </Typography>
                        <Typography className={`benefitsCardSubText`} variant='subtitle1' sx={{ flexGrow: 1 }}>
                            {benefit.description}
                        </Typography>
                        <Box className={`benefitsCardBtnBox`}>
                            <ArrowOutwardIcon />
                        </Box>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}