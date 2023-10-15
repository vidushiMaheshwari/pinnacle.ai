import React from "react";
import classes from './Notes.module.css';

export const Notes = (props) => {
    // A scrollable note with download option?
    const {text} = props.props;

    return (
        <div className={classes.body}>
            <div className={classes.heading}>
                This is the heading
            </div>
            <div className={classes.text}>
                {text}
            </div>
            <div className={classes.download}>

            </div>
        </div>
    )
}