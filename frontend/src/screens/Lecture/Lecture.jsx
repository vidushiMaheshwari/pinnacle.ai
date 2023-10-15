import React, { useEffect, useState } from "react";
import classes from './Lecture.module.css';
import { useParams } from "react-router";
import { ChatBot } from "../../components/ChatBot/ChatBot";
import { send_data } from "../../util/connection";

export const Lecture = () => {
    const {topic, college, course_name, lecture_name, lecture_id} = useParams();
    const [quizQuestion, setQuizQuestion] = useState(["here"]);

    useEffect(() => {
        async function createModel() {
            await send_data({lecture_id: lecture_id}, 'model/create_model_from_text');
            const newQuestions = await send_data({}, 'model/quiz');
            setQuizQuestion(quizQuestion.concat(newQuestions));
        }

        createModel(); // Now backend has a AI model
    }, [])

    useEffect(() => {
        async function call(quizQuestion) {
            if (quizQuestion < 3) {
                const newQuestions = await send_data({}, 'model/quiz');
            setQuizQuestion(quizQuestion.concat(newQuestions));
            }
        }
        call(quizQuestion)

    }, [quizQuestion])

    return (
        <div className={classes.body}>
            <ChatBot className={classes.chatbot} props={{lectureId: lecture_id, lectureName: lecture_name}}/>
            {quizQuestion.forEach(element => {
              <p>{element}</p>  
            })}
        </div>
    )
}