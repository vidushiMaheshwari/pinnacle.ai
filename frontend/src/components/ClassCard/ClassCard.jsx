import React from "react";
import classes from './ClassCard.module.css';

export const ClassCard = (props) => {
    const {topic, college, course_name} = props.props;
    console.log(props);
    // console.log(topic);
    return (
        <div className={classes.card}>
            <div className={classes.content}>
            <div className={classes.college}>{college}</div>
            <br />
            <div className={classes.topic}>{topic}</div>
            <div className={classes.course}>Course Name: {course_name}</div>
            </div>
        </div>
    )
}