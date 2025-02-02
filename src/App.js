import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./utilities/subComponents/navBar/navBar";
import { useSelector } from "react-redux";
import { useEffect } from 'react';

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
          {/* <Route path="/" element={} /> */}

        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;