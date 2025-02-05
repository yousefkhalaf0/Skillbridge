import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import ResponsiveAppBar from "./utilities/subComponents/navBar/navBar";
import CourseCard from "../src/utilities/subComponents/AdminPageComponents/CourseInAdminPage"
import Footer from "../src/utilities/subComponents/footer/footer"


function App() {
  const theme = useSelector((state) => state.themeReducer);

  useEffect(() => {
    const body = document.getElementById('root-body');
    if (body) {
      body.className = `${theme}App`;
    }
  }, [theme]);

  return (
    <main>
      <BrowserRouter>
        <ResponsiveAppBar />
        {/* <Routes>
           <Route path="/" element={CourseCard} />

        </Routes> */}
        <CourseCard/>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;