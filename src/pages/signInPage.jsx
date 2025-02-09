import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowScroll } from "../utilities/redux/store.jsx";
import {
  Box,
  Button,
  Grid,
  KeyboardArrowUpIcon,
} from "../utilities/muiComponents.js";
import { TestimonialsComponent } from "../utilities/subComponentsLinks.js";
import "./pagesStyle/signInPage.css";

export default function SignInPage() {
  const showScroll = useSelector((state) => state.scrollReducer.showScroll);
  const dispatch = useDispatch();

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
    <Box
      className="signInPageContainer disableSelecting"
      sx={{ width: { xs: "95%", md: "90%", lg: "85%" } }}
    >
      <Grid container spacing={2}>
        <Grid lg={6}>
          <TestimonialsComponent />
        </Grid>
        <Grid lg={6}></Grid>
      </Grid>
      {showScroll && (
        <Button onClick={scrollTop} className="signInPageScrollBtn">
          <KeyboardArrowUpIcon />
        </Button>
      )}
    </Box>
  );
}
