import React from "react";
import classes from './Lecture.module.css';
import { useParams } from "react-router";
import { ChatBot } from "../../components/ChatBot/ChatBot";

export const Lecture = () => {
    const {topic, college, course_name, lecture_name, lecture_id} = useParams();


    return (
        <div className={classes.body}>
            <ChatBot className={classes.chatbot}/>
        </div>
    )
}