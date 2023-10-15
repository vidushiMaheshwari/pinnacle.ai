import React, { useEffect } from "react";
import classes from './Lecture.module.css';
import { useParams } from "react-router";
import { ChatBot } from "../../components/ChatBot/ChatBot";
import { send_data } from "../../util/connection";

export const Lecture = () => {
    const {topic, college, course_name, lecture_name, lecture_id} = useParams();

    useEffect(() => {
        async function createModel() {
            await send_data({lecture_id}, '/model/create_model_from_text');
        }

        createModel(); // Now backend has a AI model
    }, [])

    return (
        <div className={classes.body}>
            <ChatBot className={classes.chatbot} props={{lectureId: lecture_id, lectureName: lecture_name}}/>
        </div>
    )
}