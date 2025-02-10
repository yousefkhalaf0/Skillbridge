import React from "react";
import { Box, Button, Grid, Typography } from "../../muiComponents.js";
import { useSelector } from "react-redux";
import "../testimonialsCard/testimonialsCard.css";

export default function TestimonialsCard({
  showAll,
  numOfCards,
  xs,
  md,
  subXs,
  currentIndex,
  testimonials = [],
}) {
  const theme = useSelector((state) => state.themeReducer);

  if (testimonials.length === 0) {
    return (
      <Typography variant="body1" sx={{ textAlign: "center", padding: "2rem" }}>
        No testimonials available.
      </Typography>
    );
  }

  const displayedTestimonials = showAll
    ? testimonials
    : currentIndex !== undefined
    ? [testimonials[currentIndex]]
    : testimonials.slice(0, numOfCards);

  return (
    <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
      {displayedTestimonials.map((testimonial, index) => (
        <Grid item xs={xs} md={md} key={index} sx={{ display: "flex" }}>
          <Box
            className={`${theme}TestimonialsContainer`}
            sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
          >
            <Typography
              className={`${theme}TestimonialsCardDescription`}
              variant="body1"
              sx={{ flexGrow: 1 }}
            >
              {testimonial.description}
            </Typography>
            <Grid className={`cardRow`} container>
              <Grid
                item
                xs={subXs}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  className="testimonialsImgBox"
                  component="img"
                  src={testimonial.img}
                  alt="testimonialsImg"
                />
                <Typography
                  className={`testimonialsCardUserName`}
                  variant="subtitle1"
                >
                  {testimonial.usrName}
                </Typography>
              </Grid>
              <Grid item xs={subXs} className="cardRowBtnBox">
                <Button
                  className={`testimonialsCardBtn`}
                  variant="contained"
                  sx={{ textTransform: "none" }}
                >
                  Read Full Story
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
