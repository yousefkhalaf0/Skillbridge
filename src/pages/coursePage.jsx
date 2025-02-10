import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowScroll } from "../utilities/redux/store.jsx";
import {
  Box,
  Button,
  KeyboardArrowUpIcon,
} from "../utilities/muiComponents.js";
import {
  HeroComponent,
  LargeCourseCard,
} from "../utilities/subComponentsLinks.js";
import "./pagesStyle/coursePage.css";

export default function CoursePage() {
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
      className="coursePageContainer disableSelecting"
      sx={{ width: { xs: "95%", md: "90%", lg: "85%" } }}
    >
      <HeroComponent />
      <LargeCourseCard />

      {showScroll && (
        <Button onClick={scrollTop} className="coursePageScrollBtn">
          <KeyboardArrowUpIcon />
        </Button>
      )}
    </Box>
  );
}
