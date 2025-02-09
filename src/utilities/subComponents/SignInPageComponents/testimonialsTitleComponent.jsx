import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "../../muiComponents.js";
import "./componentsStyle/testimonialsTitleComponent.css";

export default function TestimonialsTitleComponent() {
  const theme = useSelector((state) => state.themeReducer);

  return (
    <>
      <Typography className={`${theme}Title`} variant="h4" gutterBottom>
        Students Testimonials
      </Typography>
      <Typography className={`${theme}SubTitle`} variant="body1">
        Hear from our learners! At Skillbridge, we take pride in delivering a
        top-notch learning experience that truly makes a difference. Read
        testimonials from students and professionals who have gained valuable
        skills, advanced their careers, and achieved their goals with our
        expert-led courses. Your success story could be next!
      </Typography>
    </>
  );
}
