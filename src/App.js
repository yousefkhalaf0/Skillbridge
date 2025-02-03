import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import ResponsiveAppBar from "./utilities/subComponents/navBar/navBar";
import Footer from '../src/utilities/subComponents/footer/footer';
import NotFound from './pages/notFoundPage/notFoundPage';
import Home from '../src/pages/homePage/homePage';


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

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;