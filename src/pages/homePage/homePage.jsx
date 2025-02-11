import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Ensure this is imported
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
import linesIcon from "../../assets/icons/abstractLines.svg";
import homeHeaderImg from "../../assets/images/homeHeaderImg.svg";

export default function HomePage() {
  const theme = useSelector((state) => state.themeReducer);
  const showScroll = useSelector((state) => state.scrollReducer.showScroll);
  const showAllBenefits = useSelector((state) => state.showAllBenefitsReducer);
  const showAllTestimonials = useSelector(
    (state) => state.showAllTestimonialsReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Define navigate here
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          Unlock
        </Box>
        <Box
          className="headerBoxText disableSelecting"
          component="span"
          sx={{ color: "black" }}
        >
          {" "}
          Your Creative Potential
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
        with Online Design and Development Courses.
      </Typography>
      <Typography
        className={`${theme}HeaderSubSubText disableSelecting`}
        variant="subtitle1"
      >
        Learn from Industry Experts and Enhance Your Skills.
      </Typography>
      <Button
        className={`${theme}ExploreCoursesBtn`}
        variant="contained"
        sx={{ textTransform: "none" }}
        onClick={() => {
          dispatch(setActiveButton("Courses")); // Update activeButton
          navigate("/courses"); // Use navigate to redirect
        }}
      >
        Explore Courses
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
            Benefits
          </Typography>
          <Grid mb={6} container spacing={2}>
            <Grid className={`${theme}SectionsSubTitle`} item sm={9} xs={12}>
              Skillbridge is an innovative e-learning platform that provides
              flexible, interactive, and expert-designed courses, allowing
              learners to study at their own pace anytime, anywhere. With a
              diverse course library, personalized learning paths, and
              industry-recognized certifications, Skillbridge empowers students
              and professionals to enhance their skills, advance their careers,
              and enjoy a seamless, engaging learning experience.
            </Grid>
            <Grid item sm={3} xs={12}>
              <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                <Button
                  className="sectionBtn"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={() => dispatch(toggleShowAllBenefits())}
                >
                  {showAllBenefits ? "Collapse" : "View All"}
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
            Our Courses
          </Typography>
          <Grid mb={6} container spacing={2}>
            <Grid className={`${theme}SectionsSubTitle`} item sm={9} xs={12}>
              Our courses at Skillbridge are designed to provide a comprehensive
              and engaging learning experience across various subjects. Whether
              you're looking to build new skills, advance your career, or
              explore a new field, our expert-led courses feature interactive
              content, real-world applications, and certifications to help you
              achieve your goals. Learn at your own pace with high-quality
              resources tailored to your success.
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
            Our Testimonials
          </Typography>
          <Grid mb={6} container spacing={2}>
            <Grid className={`${theme}SectionsSubTitle`} item sm={9} xs={12}>
              Hear from our learners! At Skillbridge, we take pride in
              delivering a top-notch learning experience that truly makes a
              difference. Read testimonials from students and professionals who
              have gained valuable skills, advanced their careers, and achieved
              their goals with our expert-led courses. Your success story could
              be next!
            </Grid>
            <Grid item sm={3} xs={12}>
              <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                <Button
                  className="sectionBtn"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={() => dispatch(toggleShowAllTestimonials())}
                >
                  {showAllTestimonials ? "Collapse" : "View All"}
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