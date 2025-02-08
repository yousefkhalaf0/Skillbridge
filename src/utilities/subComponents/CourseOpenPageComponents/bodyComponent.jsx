import { useSelector } from 'react-redux';
import {
    Grid, Typography, Box, AccessTimeIcon
} from '../../muiComponents.js';
import './componentsStyle/bodyComponent.css';
import homeHeaderImg from '../../../assets/images/homeHeaderImg.svg';


export default function BodyComponent() {
    const theme = useSelector((state) => state.themeReducer);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
                className='bodyImg'
                component="img"
                src={homeHeaderImg}
                alt="homeHeaderImg" />

            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                    <Box className={`${theme}LesonsCard`} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <Typography className={`modulesCardText modulesNumber`} variant='h2' gutterBottom>
                            01
                        </Typography>
                        <Typography className={`modulesCardText moduleTitle`} variant='h6'>
                            Introduction to UI/UX Design
                        </Typography>

                        <Box className={`lessonsContainer`}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={8}>
                                    <Typography variant='subtitle1'
                                        sx={{
                                            color: theme === 'dark' ? 'white' : '#262626',
                                            fontWeight: 'bold'
                                        }}>
                                        UI/UX Design Course
                                    </Typography>
                                    <Typography variant='body2'
                                        sx={{
                                            color: theme === 'dark' ? 'white' : '#262626',
                                        }}>
                                        Lesson 01
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                                    <Box className={`lessonTime`} >
                                        <AccessTimeIcon />1 Hour
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}