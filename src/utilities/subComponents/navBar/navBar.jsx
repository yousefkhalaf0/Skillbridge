import React ,{useState,useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NotificationBar from "./NotificationBarComponent"

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
import languageIcondark from "../../../assets/icons/language-svgrepo-comdark.png"
import { auth } from "../../firebase.js";
// import animatedIcon from '../../../assets/animations/wired-lineal-237-star-rating-hover-pinch.gif'

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

   // Listen for authentication state changes
   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // User is logged in
      } else {
        setUser(null); // User is logged out
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
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
      // Add more cases for other routes if needed
      default:
        dispatch(setActiveButton("")); // Reset if no match
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
        Free Courses 🌟 Sale Ends Soon, Get It Now
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
                    Home
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleButtonClick("Courses", "/courses")}
                  >
                    Courses
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => handleButtonClick("About Us", "/about")}
                  >
                    About Us
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleButtonClick("Pricing", "/pricing")}
                  >
                    Pricing
                  </MenuItem> */}
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
                  Home
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
                  Courses
                </Button>
                {/* <Button
                                    color="inherit"
                                    variant={activeButton === 'About Us' ? 'contained' : 'text'}
                                    className={`${theme}Button ${activeButton === 'About Us' ? 'active' : ''}`}
                                    sx={{
                                        textTransform: 'none',
                                        mx: 1,
                                    }}
                                    onClick={() => handleButtonClick('About Us', '/about')}>
                                    About Us
                                </Button>
                                <Button
                                    color="inherit"
                                    variant={activeButton === 'Pricing' ? 'contained' : 'text'}
                                    className={`${theme}Button ${activeButton === 'Pricing' ? 'active' : ''}`}
                                    sx={{
                                        textTransform: 'none',
                                        mx: 1,
                                    }}
                                    onClick={() => handleButtonClick('Pricing', '/pricing')}>
                                    Pricing
                                </Button> */}
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
            src= { theme === "dark"?languageIcondark:languageIconlight}
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
                variant="text"
                sx={{
                  textTransform: "none",
                  mx: 1,
                  "&:hover": {
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                Sign Up
              </Button>
              <Button
                onClick={() => navigate("/signIn")}
                variant="contained"
                sx={{
                  color: "black",
                  textTransform: "none",
                  mx: 1,
                  backgroundColor: "#E8A710",
                }}
              >
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </Box>
    </Box>
  );
}
