import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dishes from "./pages/Dishes.jsx";

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/dishes">Platos</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dishes" element={<Dishes />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
