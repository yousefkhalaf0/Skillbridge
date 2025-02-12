import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  EmailIcon,
  PhoneIcon,
  LocationOnIcon,
  Typography,
  Link,
  FacebookIcon,
  XIcon,
  LinkedInIcon,
} from "../../muiComponents.js";
import "../../subComponents/footer/footer.css";
import appIcon from "../../../assets/icons/siteLogo.svg";
import en from "../../localization/en.js";
import ar from "../../localization/ar.js";

export default function Footer() {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const navigate = useNavigate();

  return (
    <Box className={`${theme}Footer`}>
      <Grid className="footerRow" container spacing={2}>
        <Grid className={`${theme}SubTitlee`} item md={6} sm={6} xs={12}>
          <Box
            className="logo"
            component="img"
            src={appIcon}
            alt="appIcon"
            onClick={() => navigate("/")}
          />
          <p>
            <EmailIcon className="icons" />
            <Link className={`${theme}Links`} href="#" underline="hover">
              {lang == "en" ? en.footer.email : ar.footer.email}
            </Link>
          </p>
          <p>
            <PhoneIcon className="icons" />
            <Link className={`${theme}Links`} href="#" underline="hover">
              {lang == "en" ? en.footer.phone : ar.footer.phone}
            </Link>
          </p>
          <p>
            <LocationOnIcon className="icons" />
            <Link className={`${theme}Links`} href="#" underline="hover">
              {lang == "en" ? en.footer.location : ar.footer.location}
            </Link>
          </p>
        </Grid>
        <Grid className={`${theme}SubTitlee`} item md={2} sm={3} xs={6}>
          <Typography
            className="disableSelecting"
            variant="subtitle1"
            gutterBottom
          >
            {lang == "en" ? en.footer.home : ar.footer.home}
          </Typography>
          <Link
            className={`${theme}Links`}
            gutterBottom
            href="#"
            underline="hover"
            display="block"
          >
            {lang == "en" ? en.footer.benefits : ar.footer.benefits}
          </Link>
          <Link
            className={`${theme}Links`}
            gutterBottom
            href="#"
            underline="hover"
            display="block"
          >
            {lang == "en" ? en.footer.ourCourses : ar.footer.ourCourses}
          </Link>
          <Link
            className={`${theme}Links`}
            gutterBottom
            href="#"
            underline="hover"
            display="block"
          >
            {lang == "en"
              ? en.footer.ourTestimonials
              : ar.footer.ourTestimonials}
          </Link>
          <Link
            className={`${theme}Links`}
            gutterBottom
            href="#"
            underline="hover"
            display="block"
          >
            {lang == "en" ? en.footer.ourFAQ : ar.footer.ourFAQ}
          </Link>
        </Grid>
        <Grid className={`${theme}SubTitlee`} item md={2} sm={3} xs={6}>
          <Typography
            className="disableSelecting"
            variant="subtitle1"
            gutterBottom
          >
            {lang == "en" ? en.footer.aboutUs : ar.footer.aboutUs}
          </Typography>
          <Link
            className={`${theme}Links`}
            gutterBottom
            href="#"
            underline="hover"
            display="block"
          >
            {lang == "en" ? en.footer.company : ar.footer.company}
          </Link>
          <Link
            className={`${theme}Links`}
            gutterBottom
            href="#"
            underline="hover"
            display="block"
          >
            {lang == "en" ? en.footer.achievements : ar.footer.achievements}
          </Link>
          <Link
            className={`${theme}Links`}
            gutterBottom
            href="#"
            underline="hover"
            display="block"
          >
            {lang == "en" ? en.footer.ourGoals : ar.footer.ourGoals}
          </Link>
        </Grid>
        <Grid className={`${theme}SubTitlee`} item md={2} xs={12}>
          <Typography
            className="disableSelecting"
            variant="subtitle1"
            sx={{ marginBottom: "1rem" }}
          >
            {lang == "en" ? en.footer.socialProfiles : ar.footer.socialProfiles}
          </Typography>
          <Box className={`${theme}SocialIconBox`}>
            <FacebookIcon className={`${theme}SocialIcons`} />
          </Box>
          <Box className={`${theme}SocialIconBox`}>
            <XIcon className={`${theme}SocialIcons`} />
          </Box>
          <Box className={`${theme}SocialIconBox`}>
            <LinkedInIcon className={`${theme}SocialIcons`} />
          </Box>
        </Grid>
      </Grid>
      <Typography
        className={`${theme}CopyRight disableSelecting`}
        variant="subtitle1"
      >
        {lang == "en" ? en.footer.copyRight : ar.footer.copyRight}
      </Typography>
    </Box>
  );
}
