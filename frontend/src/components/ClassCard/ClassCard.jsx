import React from "react";
import classes from './ClassCard.module.css';
import { useNavigate } from "react-router";

export const ClassCard = (props) => {
    const {topic, college, course_name} = props.props;
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`lectures/${college}/${topic}/${course_name}`);
    }

    return (
        <div className={classes.card} onClick={handleClick}>
            <div className={classes.content}>
            <div className={classes.college}>{college}</div>
            <br />
            <div className={classes.topic}>{topic}</div>
            <div className={classes.course}>Course Name: {course_name}</div>
            </div>
        </div>
    )
}