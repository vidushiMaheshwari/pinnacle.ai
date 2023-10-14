import React from "react";
import classes from './LectureCards.module.css'
import { useLocation, useNavigate } from "react-router";

export const LectureCard = (props) => {
    const lecture_id = props.props[0];
    const lecture_name = props.props[1];
    const navigate = useNavigate()
    const location = useLocation();

    const handleClick = () => {
        navigate(`${location.pathname}/${lecture_name}/${lecture_id}`);
    }

    return (
        <div className={classes.card} onClick={handleClick}>
        <div className={classes.heading}>
            {lecture_name}
        </div>
        </div>
    )
}