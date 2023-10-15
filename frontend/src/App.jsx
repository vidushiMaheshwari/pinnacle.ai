import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./screens/Home/Home";

import { Course } from "./screens/Course/Course";
import { Lecture } from "./screens/Lecture/Lecture";

import {Live} from "./screens/Live/Live"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lectures/:college/:topic/:course_name" element={<Course />} />

      <Route path="/lectures/:college/:topic/:course_name/:lecture_name/:lecture_id" element={<Lecture />} />


      <Route path="/live" element={<Live />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
