import React, { useEffect, useState } from "react";
// import classes from './Lecture.module.css';
import './Lecture.css';
import { useParams } from "react-router";
import { ChatBot } from "../../components/ChatBot/ChatBot";
import { send_data } from "../../util/connection";
// import { Quiz2 } from "../../components/Quiz2/Quiz2";
import { Button } from "@mui/material";

export const Lecture = () => {
    const {topic, college, course_name, lecture_name, lecture_id} = useParams();
    const [nextBtn, setNextBtn] = useState(false);
    const [text, setText] = useState("");
    const [quizQuestions, setQuizQuestions] = useState([
        {1: "Good Morning", 2: "Good Night", 3: "Good Afternoon", 4: "Good Evening", answer: "2", question: "Question"},
        {1: "Como Estas", 2: "Gracias", 3: "Buenos Nochas", 4: "Madre", answer: "3", question: "Question"}
    ]);

    useEffect(() => {
        async function createModel() {
            await send_data({lecture_id: lecture_id}, 'model/create_model_from_text'); // Create model
            await send_data({}, 'model/get_text');
            let newQuestions = await send_data({lecture_id: lecture_id}, 'model/quiz');
            newQuestions = newQuestions.data.success;
            setQuizQuestions(quizQuestions.concat(newQuestions));
        }

        createModel(); // Now backend has a AI model
    }, [])

    useEffect(() => {
        async function call(quizQuestion) {
            if (quizQuestion < 3) {
                const newQuestions = await send_data({}, 'model/quiz');
            setQuizQuestions(quizQuestions.concat(newQuestions));
            }
        }
        call(quizQuestions)

    }, [quizQuestions])

    // const handleClick = (event) => {
    //     const id = event.target.id;
    //     if (id === quizQuestions[0]['answer']) {
    //         // shade that div green
    //         document.getElementById(id).classList.add('correct')
    //         // if correct, then pop the question, and set the next one
    //         const new_questions = quizQuestions.slice(1);
    //         console.log(new_questions);
    //         setQuizQuestions(new_questions);
    //         const ids = ["1", "2", "3", "4"];
    //         ids.forEach(function(i) {
    //             if (document.getElementById(i).classList.contains('wrong')) {
    //                 document.getElementById(i).classList.remove('wrong')
    //             } else if (document.getElementById(i).classList.contains('correct')) {
    //                 document.getElementById(i).classList.remove('correct')
    //             }  
    //         })
            
    //     } else {
    //         // shade that div red
    //         document.getElementById(id).classList.add('wrong')
    //     }
    // }

    function handleClickCard(event) {
        if (event.target.id === quizQuestions[0]['answer']) {
            document.getElementById(event.target.id).classList.add('correct');
            setNextBtn(true);
        } else {
            if (!nextBtn) {
                document.getElementById(event.target.id).classList.add('wrong');
            }
        }
    }

    function handleNext(){
            const new_questions = quizQuestions.slice(1);
            setQuizQuestions(new_questions);  
        setNextBtn(false);
        const ids = ["1", "2", "3", "4"];
            ids.forEach(function(i) {
                if (document.getElementById(i).classList.contains('wrong')) {
                    document.getElementById(i).classList.remove('wrong')
                } else if (document.getElementById(i).classList.contains('correct')) {
                    document.getElementById(i).classList.remove('correct')
                }  
            })
    }

    // const getClass = (id) => {
    //     return (id === quizQuestions[0]['answer']) ? 'correct' : 'wrong';
    // }

    return (
        <div className='body'>
            <ChatBot className='chatbot' props={{lectureId: lecture_id, lectureName: lecture_name}}/>

             {(quizQuestions.length > 0) && (<div>
            <div className='question'> {quizQuestions[0]['question']} </div>
            <div className='options'>
            <div className={`card`} id={"1"} onClick={handleClickCard}> {quizQuestions[0]['1']} </div>
            <div className={`card`} id={"2"} onClick={handleClickCard}> {quizQuestions[0]['2']} </div>
            <div className={`card`} id={"3"} onClick={handleClickCard}> {quizQuestions[0]['3']} </div>
            <div className={`card`} id={"4"} onClick={handleClickCard}> {quizQuestions[0]['4']} </div>
            </div>
            <Button onClick={handleNext}>Next</Button>

        </div>)}
        </div>
    )
}