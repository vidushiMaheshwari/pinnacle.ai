import React, { useEffect, useState } from "react";
// import classes from './Lecture.module.css';
import "./Lecture.css";
import { useParams } from "react-router";
import { ChatBot } from "../../components/ChatBot/ChatBot";
import { send_data } from "../../util/connection";
// import { Quiz2 } from "../../components/Quiz2/Quiz2";
import { Button } from "@mui/material";
import { Notes } from "../../components/Notes/Notes";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import {
  FormControlLabel,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
} from "@mui/material";

export const Lecture = () => {
  const { topic, college, course_name, lecture_name, lecture_id } = useParams();
  const [nextBtn, setNextBtn] = useState(false);
  const [text, setText] = useState("");
  const [quizQuestions, setQuizQuestions] = useState([]);

  useEffect(() => {
    async function createModel() {
      await send_data(
        { lecture_id: lecture_id },
        "model/create_model_from_text"
      ); // Create model
      let text = await send_data({ lecture_id: lecture_id }, "model/get_text");
      setText(text.data.success);
      let newQuestions = await send_data(
        { lecture_id: lecture_id },
        "model/quiz"
      );
      newQuestions = newQuestions.data.success;
      setQuizQuestions(quizQuestions.concat(newQuestions));
    }

    createModel(); // Now backend has a AI model
  }, []);

  useEffect(() => {
    async function call(quizQuestion) {
      if (quizQuestion < 3) {
        let newQuestions = await send_data({}, "model/quiz");
        newQuestions = newQuestions.data.success;
        setQuizQuestions(quizQuestions.concat(newQuestions));
      }
    }
    call(quizQuestions);
  }, [quizQuestions]);

  function handleClickCard(event) {
    if (event.target.id === quizQuestions[0]["answer"]) {
      document.getElementById(event.target.id).classList.add("correct");
      setNextBtn(true);
    } else {
      if (!nextBtn) {
        document.getElementById(event.target.id).classList.add("wrong");
      }
    }
  }

  function handleNext() {
    const new_questions = quizQuestions.slice(1);
    setQuizQuestions(new_questions);
    setNextBtn(false);
    const ids = ["1", "2", "3", "4"];
    ids.forEach(function (i) {
      if (document.getElementById(i).classList.contains("wrong")) {
        document.getElementById(i).classList.remove("wrong");
      } else if (document.getElementById(i).classList.contains("correct")) {
        document.getElementById(i).classList.remove("correct");
      }
    });
  }

  return (
    <div className="body">
      <div className="heading">{lecture_name}</div>
      <div className="features">
        <Notes
          props={{ text: text, lecture_name: lecture_name }}
          className="feature_item notes"
        />
        {quizQuestions.length === 0 && (
          <div className="notes feature_item" style={{ height: "350px", width: "240px" }}>
            {" "}
            Loading..{" "}
          </div>
        )}
        {quizQuestions.length > 0 && (
          <Card sx={"feature_item"}>
            <CardContent>
              <Typography variant="body2" color="text.primary">
                {quizQuestions[0]["question"]}
              </Typography>
            </CardContent>
            <CardActions>
              <div className="quiz_body">
                <div className="options">
                  <div className={`card`} id={"1"} onClick={handleClickCard}>
                    {" "}
                    {quizQuestions[0]["1"]}{" "}
                  </div>
                  <div className={`card`} id={"2"} onClick={handleClickCard}>
                    {" "}
                    {quizQuestions[0]["2"]}{" "}
                  </div>
                  <div className={`card`} id={"3"} onClick={handleClickCard}>
                    {" "}
                    {quizQuestions[0]["3"]}{" "}
                  </div>
                  <div className={`card`} id={"4"} onClick={handleClickCard}>
                    {" "}
                    {quizQuestions[0]["4"]}{" "}
                  </div>
                </div>
                <Button onClick={handleNext}> Next </Button>
              </div>
            </CardActions>
          </Card>
        )}{" "}
        
        <ChatBot
          className="chatbot feature_item"
          props={{ lectureId: lecture_id, lectureName: lecture_name }}
        />
      </div>
    </div>
  );
};
