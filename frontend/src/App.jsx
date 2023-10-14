import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home/Home";
import { Module } from "./screens/Module/Module";
import {Live} from "./screens/Live/Live"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/module" element={<Module />} />
      <Route path="/live" element={<Live />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
