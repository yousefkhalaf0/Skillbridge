import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Box, Grid, EmailIcon, PhoneIcon, LocationOnIcon, Typography, Link, FacebookIcon, XIcon, LinkedInIcon
} from '../../muiComponents.js';
import '../../subComponents/footer/footer.css';
import appIcon from '../../../assets/icons/siteLogo.svg';


export default function Footer() {
    const theme = useSelector((state) => state.themeReducer);
    const navigate = useNavigate();

    return (
        <Box className={`${theme}Footer`}>
            <Grid className='footerRow' container spacing={2} >
                <Grid className={`${theme}SubTitle`} item md={6} sm={6} xs={12}>
                    <Box
                        className='logo'
                        component="img"
                        src={appIcon}
                        alt="appIcon"
                        onClick={() => navigate('/')} />
                    <p><EmailIcon className='icons' />
                        <Link className={`${theme}Links`} href="#" underline="hover" >
                            hello@skillbridge.com
                        </Link>
                    </p>
                    <p><PhoneIcon className='icons' />
                        <Link className={`${theme}Links`} href="#" underline="hover" >
                            +91 91813 23 2309
                        </Link>
                    </p>
                    <p><LocationOnIcon className='icons' />
                        <Link className={`${theme}Links`} href="#" underline="hover" >
                            Somewhere in the World
                        </Link>
                    </p>
                </Grid>
                <Grid className={`${theme}SubTitle`} item md={2} sm={3} xs={6}>
                    <Typography className='disableSelecting' variant="subtitle1" gutterBottom>
                        Home
                    </Typography>
                    <Link className={`${theme}Links`} gutterBottom href="#" underline="hover" display="block">
                        Benefits
                    </Link>
                    <Link className={`${theme}Links`} gutterBottom href="#" underline="hover" display="block">
                        Our Courses
                    </Link>
                    <Link className={`${theme}Links`} gutterBottom href="#" underline="hover" display="block">
                        Our Testimonials
                    </Link>
                    <Link className={`${theme}Links`} gutterBottom href="#" underline="hover" display="block">
                        Our FAQ
                    </Link>
                </Grid>
                <Grid className={`${theme}SubTitle`} item md={2} sm={3} xs={6}>
                    <Typography className='disableSelecting' variant="subtitle1" gutterBottom>
                        About Us
                    </Typography>
                    <Link className={`${theme}Links`} gutterBottom href="#" underline="hover" display="block">
                        Company
                    </Link>
                    <Link className={`${theme}Links`} gutterBottom href="#" underline="hover" display="block">
                        Achievements
                    </Link>
                    <Link className={`${theme}Links`} gutterBottom href="#" underline="hover" display="block">
                        Our Goals
                    </Link>
                </Grid>
                <Grid className={`${theme}SubTitle`} item md={2} xs={12}>
                    <Typography className='disableSelecting' variant="subtitle1" sx={{ marginBottom: '1rem' }}>
                        Social Profiles
                    </Typography>
                    <Box className={`${theme}SocialIconBox`} >
                        <FacebookIcon className={`${theme}SocialIcons`} />
                    </Box>
                    <Box className={`${theme}SocialIconBox`} >
                        <XIcon className={`${theme}SocialIcons`} />
                    </Box>
                    <Box className={`${theme}SocialIconBox`} >
                        <LinkedInIcon className={`${theme}SocialIcons`} />
                    </Box>
                </Grid>
            </Grid>
            <Typography className={`${theme}CopyRight disableSelecting`} variant="subtitle1">
                © 2025 Skillbridge. All rights reserved.
            </Typography>
        </Box>
    )
}