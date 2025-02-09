import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect,useState, useRef } from 'react';
import ResponsiveAppBar from "./utilities/subComponents/navBar/navBar";
import CourseCard from "../src/utilities/subComponents/AdminPageComponents/CourseInAdminPage"
import Footer from "../src/utilities/subComponents/footer/footer"
import Dashboard from "./pages/DashboardPage"

function App() {
  const theme = useSelector((state) => state.themeReducer);
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  useEffect(() => {
    const body = document.getElementById("root-body");
    if (body) {
      body.className = `${theme}App`;
    }

  }, [theme]);
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.getBoundingClientRect().height);
    }
  }, []);

  return (
    <main>
      <BrowserRouter>
      <div ref={navRef}>
          <ResponsiveAppBar />
        </div>
        <Routes>
          <Route path="/" element={<Dashboard navHeight={navHeight} />} />
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/course/:courseId" element={<CourseOpenPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}
