import React, { useState } from "react";
import "./componentsStyle/testimonialsComponent.css";
import {
  Box,
  Button,
  Stack,
  ArrowBackIcon,
  ArrowForwardIcon,
} from "../../muiComponents.js";
import {
  TestimonialsCard,
  TestimonialsTitleComponent,
} from "../../subComponentsLinks.js";
import { useSelector } from "react-redux";
import { testimonials } from "../../testimonialsData.js";

export default function TestimonialsComponent() {
  const theme = useSelector((state) => state.themeReducer);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "2rem" }}>
      <TestimonialsTitleComponent />
      <TestimonialsCard
        showAll={false}
        currentIndex={currentIndex}
        xs={12}
        md={12}
        subXs={6}
        testimonials={testimonials}
      />
      <Stack direction="row" spacing={1} className="testimonialsBtns">
        <Button
          className={`${theme}Btn`}
          variant="contained"
          onClick={handlePrev}
        >
          <ArrowBackIcon />
        </Button>
        <Button
          className={`${theme}Btn`}
          variant="contained"
          onClick={handleNext}
        >
          <ArrowForwardIcon />
        </Button>
      </Stack>
    </Box>
  );
}
