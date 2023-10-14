import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home/Home";
import { Module } from "./screens/Module/Module";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/module" element={<Module />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
