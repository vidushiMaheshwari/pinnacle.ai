import React from "react";

export const ClassCard = (props) => {
    const {topics, college} = props;
    return (
        <div>
            <div>College: {college}</div>
            <div>Topic: {topics}</div>
            <div>Course Name: course will come</div>
        </div>
    )
}