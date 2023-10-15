import React from "react";
import classes from './Notes.module.css';

export const Notes = (props) => {
    // A scrollable note with download option?
    const {text, lecture_name} = props.props;

    return (
        <div className={classes.body}>
            <div className={classes.heading}>
                {lecture_name}'s  Notes
            </div>
            <div className={classes.text}>
                {text}
            </div>
            <div className={classes.download} >

            </div>
        </div>
    )
}