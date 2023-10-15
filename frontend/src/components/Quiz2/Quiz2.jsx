import React from "react";
import './Quiz2.css';

export const Quiz2 = (props) => {
    // console.log(props);
    const {quizQuestions, setQuizQuestions} = props.props;
    console.log("I AM IN QUIZ2");
    // console.log(quizQuestions);
    console.log(quizQuestions[0]['1'])

    const handleClick = (event) => {
        console.log(event.target.id)
        const id = event.target.id;
        if (id === quizQuestions[0]['answer']) {
            // shade that div green
            document.getElementById(id).classList.add('correct')
            // if correct, then pop the question, and set the next one
            const new_questions = quizQuestions.shift();

            // setQuizQuestions(new_questions);
        } else {
            // shade that div red
            document.getElementById(id).classList.add('wrong')
        }
    }

    return (
        <div>
            <div className='question'> {quizQuestions[0]['question']} </div>
            <div className='options'>
            <div className='card' onClick={handleClick} id={"1"}> {quizQuestions[0]['1']} </div>
            <div className='card' onClick={handleClick} id={"2"}> {quizQuestions[0]['2']} </div>
            <div className='card' onClick={handleClick} id={"3"}> {quizQuestions[0]['3']} </div>
            <div className='card' onClick={handleClick} id={"4"}> {quizQuestions[0]['4']} </div>
            </div>
            
        </div>
    )
}