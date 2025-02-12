import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setShowScroll,
  toggleShowAllBenefits,
  toggleShowAllTestimonials,
  setActiveButton,
} from "../../utilities/redux/store.jsx";
import {
  Box,
  Grid,
  Typography,
  ElectricBoltIcon,
  Button,
  KeyboardArrowUpIcon,
} from "../../utilities/muiComponents.js";
import {
  ComercialBox,
  BenefitsCard,
  SmallCourseCard,
  TestimonialsCard,
} from "../../utilities/subComponentsLinks.js";
import { testimonials } from "../../utilities/testimonialsData.js";
import "../homePage/homePage.css";
import en from "../../utilities/localization/en.js";
import ar from "../../utilities/localization/ar.js";
import linesIcon from "../../assets/icons/abstractLines.svg";
import homeHeaderImg from "../../assets/images/homeHeaderImg.svg";

export default function HomePage() {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const showScroll = useSelector((state) => state.scrollReducer.showScroll);
  const showAllBenefits = useSelector((state) => state.showAllBenefitsReducer);
  const showAllTestimonials = useSelector(
    (state) => state.showAllTestimonialsReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coursesRef = useRef(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const checkScrollTop = () => {
    const shouldShow = window.pageYOffset > 400;
    if (shouldShow !== showScroll) {
      dispatch(setShowScroll(shouldShow));
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll, dispatch]);
  const scrollTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <main className="homePageContainer">
      {/* Hero section */}
      <Typography
        gutterBottom
        className="headerBox"
        variant="h4"
        component="div"
        sx={{
          fontSize: { xs: "1.25rem", sm: "1.75rem", md: "2.5rem" },
        }}
      >
        <Box className="headerIconBox">
          <ElectricBoltIcon className="headerIcon" />
        </Box>
        <Box
          className="headerBoxText disableSelecting"
          component="span"
          sx={{ color: "#E8A710" }}
        >
          {lang === "en" ? en.unlock : ar.unlock}
        </Box>
        <Box
          className="headerBoxText disableSelecting"
          component="span"
          sx={{ color: "black" }}
        >
          {" "}
          {lang === "en" ? en.yourCreativePotential : ar.yourCreativePotential}
        </Box>
        <Box
          className={`linesIcon ${theme}LinesIcon`}
          component="img"
          src={linesIcon}
          alt="linesIcon"
        />
      </Typography>
      <Typography
        className={`${theme}HeaderSubText disableSelecting`}
        variant="h5"
        gutterBottom
      >
        {lang === "en"
          ? en.withOnlineDesignAndDevelopmentCourses
          : ar.withOnlineDesignAndDevelopmentCourses}
      </Typography>
      <Typography
        className={`${theme}HeaderSubSubText disableSelecting`}
        variant="subtitle1"
      >
        {lang === "en"
          ? en.learnFromIndustryExpertsAndEnhanceYourSkills
          : ar.learnFromIndustryExpertsAndEnhanceYourSkills}
      </Typography>
      <Button
        className={`${theme}ExploreCoursesBtn`}
        variant="contained"
        sx={{ textTransform: "none" }}
        onClick={() => {
          dispatch(setActiveButton("Courses"));
          navigate("/courses");
        }}
      >
        {lang === "en" ? en.exploreCourses : ar.exploreCourses}
      </Button>
      <ComercialBox />
      <Box
        className="homeHeaderImg"
        component="img"
        src={homeHeaderImg}
        alt="homeHeaderImg"
        sx={{
          width: { xs: "95%", md: "90%", lg: "85%" },
        }}
      />

      {/* Benefits section */}
      <Box
        className={`sectionsContainer`}
        sx={{ width: { xs: "95%", md: "90%", lg: "85%" } }}
      >
        <Box className={`disableSelecting`}>
          <Typography
            className={`${theme}SectionsTitle`}
            variant="h4"
            gutterBottom
          >
            {lang === "en" ? en.benefits : ar.benefits}
          </Typography>
          <Grid mb={6} container spacing={2}>
            <Grid className={`${theme}SectionsSubTitle`} item sm={9} xs={12}>
              {lang === "en"
                ? en.skillbridgeDescription
                : ar.skillbridgeDescription}
            </Grid>
            <Grid item sm={3} xs={12}>
              <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                <Button
                  className="sectionBtn"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={() => dispatch(toggleShowAllBenefits())}
                >
                  {showAllBenefits
                    ? lang === "en"
                      ? en.collapse
                      : ar.collapse
                    : lang === "en"
                    ? en.viewAll
                    : ar.viewAll}
                </Button>
              </Box>
            </Grid>
          </Grid>
          <BenefitsCard showAll={showAllBenefits} />
        </Box>
      </Box>

      {/* Course section */}
      <Box
        ref={coursesRef}
        className={`sectionsContainer`}
        sx={{ width: { xs: "95%", md: "90%", lg: "85%" } }}
      >
        <Box className={`disableSelecting`}>
          <Typography
            className={`${theme}SectionsTitle`}
            variant="h4"
            gutterBottom
          >
            {lang === "en" ? en.ourCourses : ar.ourCourses}
          </Typography>
          <Grid mb={6} container spacing={2}>
            <Grid className={`${theme}SectionsSubTitle`} item sm={9} xs={12}>
              {lang === "en"
                ? en.ourCoursesDescription
                : ar.ourCoursesDescription}
            </Grid>
          </Grid>
          <SmallCourseCard />
        </Box>
      </Box>

      {/* Testimonials section */}
      <Box
        className={`sectionsContainer`}
        sx={{ width: { xs: "95%", md: "90%", lg: "85%" } }}
      >
        <Box className={`disableSelecting`}>
          <Typography
            className={`${theme}SectionsTitle`}
            variant="h4"
            gutterBottom
          >
            {lang === "en" ? en.ourTestimonials : ar.ourTestimonials}
          </Typography>
          <Grid mb={6} container spacing={2}>
            <Grid className={`${theme}SectionsSubTitle`} item sm={9} xs={12}>
              {lang === "en"
                ? en.ourTestimonialsDescription
                : ar.ourTestimonialsDescription}
            </Grid>
            <Grid item sm={3} xs={12}>
              <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                <Button
                  className="sectionBtn"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={() => dispatch(toggleShowAllTestimonials())}
                >
                  {showAllTestimonials
                    ? lang === "en"
                      ? en.collapse
                      : ar.collapse
                    : lang === "en"
                    ? en.viewAll
                    : ar.viewAll}
                </Button>
              </Box>
            </Grid>
          </Grid>
          <TestimonialsCard
            showAll={showAllTestimonials}
            numOfCards={2}
            xs={12}
            md={6}
            subXs={6}
            testimonials={testimonials}
          />
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
        <Button onClick={scrollTop} className="homePageScrollBtn">
          <KeyboardArrowUpIcon />
        </Button>
      )}
    </main>
  );
}
