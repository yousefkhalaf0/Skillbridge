import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotificationBar from "./NotificationBarComponent";
import {
  setActiveButton,
  setAnchorEl,
  toggleLanguage,
  toggleTheme,
} from "../../redux/store";
import {
  Box,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  ArrowForwardIcon,
  LightModeIcon,
  DarkModeIcon,
  MenuIcon,
} from "../../muiComponents.js";
import "../../subComponents/navBar/navBar.css";
import appIcon from "../../../assets/icons/siteLogo.svg";
import languageIconlight from "../../../assets/icons/language-svgrepo-comlight.png";
import languageIcondark from "../../../assets/icons/language-svgrepo-comdark.png";
import { auth } from "../../firebase.js";
import en from "../../localization/en.js";
import ar from "../../localization/ar.js";

export default function NavBar() {
  const theme = useSelector((state) => state.themeReducer);
  const { activeButton, anchorEl } = useSelector(
    (state) => state.navbarReducer
  );
  const lang = useSelector((state) => state.languageReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const responsivness = useTheme();
  const isSmallScreen = useMediaQuery(responsivness.breakpoints.down("sm"));

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/":
        dispatch(setActiveButton("Home"));
        break;
      case "/courses":
        dispatch(setActiveButton("Courses"));
        break;
      case "/signIn":
        dispatch(setActiveButton("SignIn")); // Set active button for Sign In
        break;
      case "/signUp":
        dispatch(setActiveButton("SignUp")); // Set active button for Sign Up
        break;
      default:
        dispatch(setActiveButton(""));
    }
  }, [location, dispatch]);

  const handleButtonClick = (buttonName, path) => {
    dispatch(setActiveButton(buttonName));
    dispatch(setAnchorEl(null));
    navigate(path);
  };

  const handleMenuOpen = (event) => {
    dispatch(setAnchorEl(event.currentTarget));
  };
  const handleMenuClose = () => {
    dispatch(setAnchorEl(null));
  };

  return (
    <Box align="center" sx={{ mt: 2 }}>
      <Box
        onClick={() => navigate("/courses")}
        className={`${theme}NavBarPanner`}
        sx={{
          width: "95%",
          py: 1,
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
      >
        {lang == "en" ? en.navbar.bannerText : ar.navbar.bannerText}
        <ArrowForwardIcon sx={{ verticalAlign: "middle", ml: 2 }} />
      </Box>

      <Box
        className={`${theme}NavBar`}
        position="sticky"
        sx={{
          width: "95%",
          backgroundColor: "transparent",
          borderBottom: "1px solid white",
        }}
      >
        <Toolbar>
          <Box
            component="img"
            src={appIcon}
            alt="appIcon"
            sx={{ width: "2.5rem", marginRight: "25px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {isSmallScreen && (
              <>
                <IconButton
                  sx={{
                    color: theme === "dark" ? "white" : "black",
                    "&:hover": {
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                  onClick={handleMenuOpen}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleButtonClick("Home", "/")}>
                    {lang == "en" ? en.navbar.home : ar.navbar.home}
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleButtonClick("Courses", "/courses")}
                  >
                    {lang == "en" ? en.navbar.courses : ar.navbar.courses}
                  </MenuItem>
                </Menu>
              </>
            )}
            {!isSmallScreen && (
              <>
                <Button
                  color="inherit"
                  variant={activeButton === "Home" ? "contained" : "text"}
                  className={`${theme}Button ${
                    activeButton === "Home" ? "active" : ""
                  }`}
                  sx={{
                    textTransform: "none",
                    mx: 1,
                  }}
                  onClick={() => handleButtonClick("Home", "/")}
                >
                  {lang == "en" ? en.navbar.home : ar.navbar.home}
                </Button>
                <Button
                  color="inherit"
                  variant={activeButton === "Courses" ? "contained" : "text"}
                  className={`${theme}Button ${
                    activeButton === "Courses" ? "active" : ""
                  }`}
                  sx={{
                    textTransform: "none",
                    mx: 1,
                  }}
                  onClick={() => handleButtonClick("Courses", "/courses")}
                >
                  {lang == "en" ? en.navbar.courses : ar.navbar.courses}
                </Button>
              </>
            )}
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              sx={{
                ml: "auto",
                color: theme === "dark" ? "white" : "black",
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton
              onClick={() => dispatch(toggleLanguage())}
              sx={{
                color: theme === "dark" ? "white" : "black",
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Box
                component="img"
                src={theme === "dark" ? languageIcondark : languageIconlight}
                alt="appIcon"
                sx={{ width: "2rem", cursor: "pointer" }}
              />
            </IconButton>
          </Box>

          {user ? (
            <NotificationBar />
          ) : (
            <>
              <Button
                onClick={() => navigate("/signUp")}
                color="inherit"
                variant={activeButton === "SignUp" ? "contained" : "text"} // Apply active styles
                sx={{
                  textTransform: "none",
                  mx: 1,
                  "&:hover": {
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)",
                  },
                  backgroundColor:
                    activeButton === "SignUp" ? "#E8A710" : "transparent",
                }}
              >
                {lang == "en" ? en.navbar.signUp : ar.navbar.signUp}
              </Button>
              <Button
                onClick={() => navigate("/signIn")}
                variant={activeButton === "SignIn" ? "contained" : "text"} // Apply active styles
                sx={{
                  color: "black",
                  textTransform: "none",
                  mx: 1,
                  backgroundColor:
                    activeButton === "SignIn" ? "#E8A710" : "transparent",
                }}
              >
                {lang == "en" ? en.navbar.login : ar.navbar.login}
              </Button>
            </>
          )}
        </Toolbar>
      </Box>
    </Box>
  );
}
