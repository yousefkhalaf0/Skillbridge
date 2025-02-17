import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  ButtonBase,
} from "@mui/material";
import {
  MenuBook,
  People,
  BarChart,
  ChatBubble,
  Settings,
  ExitToApp,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import navLogo from "../../../assets/dashboard_assets/icons/dot_sidebar_icon.png";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { checkIfAdmin } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/store";
const Sidebar = ({ navHeight, setSelectedSection, selectedSection }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const lang = useSelector((state) => state.languageReducer);
  const navHeightWithmargin = navHeight + 16;
  const navigate = useNavigate(); // Initialize navigation
  const auth = getAuth(); // Firebase Authentication
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userData"));
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUserId(user.uid);
        const adminStatus = await checkIfAdmin(user.uid);
        setIsAdmin(adminStatus);
      } else {
        setUserId(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, [dispatch, auth]);
  return (
    <Box
      sx={{
        display: "flex",
        width: 160,
        borderRight: { lg: "1px solid white" },
        borderBottom: {
          md: "1px solid white",
          xs: "1px solid white",
          lg: "0px",
        },
        p: 2,
        position: { lg: "absolute" },
        top: { lg: `${navHeightWithmargin}px` },
        flexDirection: { lg: "column", xs: "column" },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Box
          component="img"
          sx={{
            height: 24,
            width: 24,
            mr: 1,
            maxHeight: { xs: 200, md: 300 },
            maxWidth: { xs: 200, md: 300 },
          }}
          alt="Descriptive Alt Text"
          src={navLogo}
        />
        <Typography variant="h6" fontWeight="bold">
          {userInfo?.username}
        </Typography>
      </Box>
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          {lang == "en" ? "Menu" : "القائمة"}
        </Typography>
        <Box>
          <List
            sx={{ display: "flex", flexDirection: { lg: "column", xs: "row" } }}
          >
            {[
              {
                textAR: "الدورات",
                text: "Courses",
                icon: <MenuBook />,
                section: "Courses",
              },
              isAdmin && {
                textAR: "الطلاب",
                text: "Students",
                icon: <People />,
                section: "Students",
              },
            ].map((item, index) => (
              <ButtonBase
                key={index}
                sx={{ width: "100%", borderRadius: 2 }}
                onClick={() => setSelectedSection(item.section)}
              >
                <ListItem
                  sx={{
                    bgcolor:
                      selectedSection === item.section
                        ? "#E8A710"
                        : "transparent",
                    boxShadow: selectedSection === item.section ? 2 : 0,
                    color: selectedSection === item.section ? "white" : "gray",
                    borderRadius: 2,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        selectedSection === item.section ? "white" : "gray",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={lang == "en" ? item.text : item.textAR}
                  />
                </ListItem>
              </ButtonBase>
            ))}
          </List>
        </Box>
      </Box>

      <Box />
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          {lang == "en" ? "Account" : "الحساب"}
        </Typography>
        <List
          sx={{ display: "flex", flexDirection: { lg: "column", xs: "row" } }}
        >
          {[
            {
              textAR: "الرسائل",
              text: "Messages",
              icon: (
                <Badge badgeContent={5} color="error" bgcolor="#E8A710">
                  <ChatBubble />
                </Badge>
              ),
              section: "Messages",
            },
            {
              textAR: "الإعدادات",
              text: "Settings",
              icon: <Settings />,
              section: "Settings",
            },
            {
              textAR: "تسجيل خروج",
              text: "Log out",
              icon: <ExitToApp />,
              section: "/logout",
            },
          ].map((item, index) => (
            <ButtonBase
              key={index}
              sx={{ width: "100%", borderRadius: 2 }}
              onClick={() => {
                if (item.section === "/logout") {
                  handleSignOut();
                } else {
                  setSelectedSection(item.section);
                }
              }}
            >
              <ListItem
                sx={{
                  bgcolor:
                    selectedSection === item.section
                      ? "#fcb900"
                      : "transparent",
                  color: selectedSection === item.section ? "white" : "gray",
                  boxShadow: selectedSection === item.section ? 2 : 0,
                  borderRadius: 3,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selectedSection === item.section ? "white" : "gray",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={lang == "en" ? item.text : item.textAR}
                />
              </ListItem>
            </ButtonBase>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
