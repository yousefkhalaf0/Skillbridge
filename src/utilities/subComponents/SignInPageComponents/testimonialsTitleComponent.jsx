import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "../../muiComponents.js";
import "./componentsStyle/testimonialsTitleComponent.css";
import en from "../../localization/en.js";
import ar from "../../localization/ar.js";

export default function TestimonialsTitleComponent() {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);

  return (
    <>
      <Typography className={`${theme}Title`} variant="h4" gutterBottom>
        {lang == "en" ? en.testimonials.title : ar.testimonials.title}
      </Typography>
      <Typography className={`${theme}SubTitle`} variant="body1">
        {lang == "en" ? en.testimonials.subtitle : ar.testimonials.subtitle}
      </Typography>
    </>
  );
}
