import React from "react";
import { useSelector } from "react-redux";
import { Grid, Typography } from "../../muiComponents.js";
import "./componentsStyle/heroComponent.css";
import en from "../../localization/en.js";
import ar from "../../localization/ar.js";

export default function HeroComponent() {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);

  return (
    <Grid className={`heroComponentContainer`} container spacing={2}>
      <Grid item md={6}>
        <Typography
          variant="h4"
          sx={{
            color: theme === "dark" ? "white" : "#262626",
            fontWeight: "bold",
          }}
        >
          {lang === "en" ? en.coursePageHero.title : ar.coursePageHero.title}
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Typography
          variant="body2"
          sx={{
            color: theme === "dark" ? "#CFCFD0 " : "#5B5B5C",
          }}
        >
          {lang === "en"
            ? en.coursePageHero.description
            : ar.coursePageHero.description}
        </Typography>
      </Grid>
    </Grid>
  );
}
