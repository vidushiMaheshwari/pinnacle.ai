import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import classes from './Course.module.css';
import { ChatBot } from "../../components/ChatBot/ChatBot";
import { send_data } from "../../util/connection";
import { LectureCard } from "../../components/LectureCards/LectureCard";

export const Course = () => {
    const {topic, college, course_name} = useParams();
    const [lectures, setLectures] = useState([]);

    useEffect(() => {
        async function getLectures() {
            let result = await send_data({college, topic, course_name}, "/db/get_course_lectures");
            result = result.data;
            if (!result['success']) {
                console.log('oopsies');
            } else {
                result = result['success'];
                setLectures(result);
            }
        } 
        getLectures();
        console.log(lectures);
    }, [])

    return (
        <div className={classes.body}>
            <div className={classes.course}> 
            {course_name} 
            </div>
            {/* <span>
            <div className={classes.topic}> {topic} </div>
            <div className={classes.college}> {college} </div>
            </span> */}
            

         {/* hola maigo
         {lectures.length} */}
         {lectures.map((card, index) => (
            <>
            {card}
        <LectureCard key={index} props={card} />
        </>
      ))}
         
         {/* <ChatBot props={mapi}/> */}
        </div>
    )
}