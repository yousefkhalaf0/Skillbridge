import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowScroll } from "../utilities/redux/store.jsx";
import {
  Box,
  Button,
  Grid,
  KeyboardArrowUpIcon,
} from "../utilities/muiComponents.js";
import {
  TestimonialsComponent,
  SignInForm,
} from "../utilities/subComponentsLinks.js";
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
    window.scrollTo({ top: 0 });
  };

  return (
    <Box
      className="signInPageContainer disableSelecting"
      sx={{ width: { xs: "95%", md: "90%", lg: "85%" } }}
    >
      <Grid container>
        <Grid
          xs={12}
          md={6}
          lg={7}
          sx={{
            order: { xs: 2, md: 1 },
          }}
        >
          <TestimonialsComponent />
        </Grid>
        <Grid
          xs={12}
          md={6}
          lg={5}
          sx={{
            order: { xs: 1, md: 2 },
          }}
        >
          <SignInForm />
        </Grid>
      </Grid>

      {showScroll && (
        <Button onClick={scrollTop} className="signInPageScrollBtn">
          <KeyboardArrowUpIcon />
        </Button>
      )}
    </Box>
  );
}
