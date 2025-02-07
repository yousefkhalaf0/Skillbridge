import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { ResponsiveAppBar, Footer } from '../src/utilities/subComponentsLinks.js';
import NotFound from './pages/notFoundPage/notFoundPage';
import Home from '../src/pages/homePage/homePage';
import CoursePage from '../src/pages/coursePage.jsx';
import CourseOpenPage from '../src/pages/courseOpenPage.jsx';


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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/course" element={<CourseOpenPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;