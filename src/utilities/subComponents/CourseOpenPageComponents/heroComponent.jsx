import React from "react";
import { useSelector } from "react-redux";
import { Button, Grid, Typography } from "../../muiComponents.js";
import "./componentsStyle/heroComponent.css";
import en from "../../localization/en.js";
import ar from "../../localization/ar.js";

export default function HeroComponent({ course }) {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);

  if (!course) {
    return (
      <Grid className={`largeHeroComponentContainer`} container spacing={2}>
        <Grid item md={12}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            {lang == "en"
              ? en.courseOpenPageHero.noCourseData
              : ar.courseOpenPageHero.noCourseData}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid className={`largeHeroComponentContainer`} container spacing={2}>
      <Grid item md={5}>
        <Typography
          variant="h4"
          sx={{
            color: theme === "dark" ? "white" : "#262626",
            fontWeight: "bold",
          }}
        >
          {lang == "en" ? course.course_name : course.course_nameAR}
        </Typography>

        <Button
          className={`${theme}EnrollBtn`}
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          {lang == "en"
            ? en.courseOpenPageHero.enrollButton
            : ar.courseOpenPageHero.enrollButton}
        </Button>
      </Grid>

      <Grid item md={7}>
        <Typography
          variant="body2"
          sx={{
            color: theme === "dark" ? "#CFCFD0 " : "#5B5B5C",
          }}
        >
          {lang == "en"
            ? course.course_description
            : course.course_descriptionAR}
        </Typography>
      </Grid>
    </Grid>
  );
}
