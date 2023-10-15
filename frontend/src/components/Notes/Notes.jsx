import React from "react";
import classes from './Notes.module.css';
import { jsPDF } from "jspdf";

export const Notes = (props) => {
    // A scrollable note with download option?
    const {text, lecture_name} = props.props;

    const download = () => {
        const doc = new jsPDF();
        const splitText = doc.splitTextToSize(text, 180);
        let y = 7;
        for (var i = 0; i < splitText.length; i++) {                
            if (y > 280) {
                y = 10;
                doc.addPage();
            }
            doc.text(15, y, splitText[i]);
            y = y + 7;
        }
        doc.save(`${lecture_name}.pdf`);
    }

    return (
        <div className={classes.body}>
            <div className={classes.heading}>Notes</div>
            <div className={classes.text}>
                <div className={classes.inner_text}>
                {text}
                </div>
            </div>
            <div className={classes.download} onClick={download}>
                Download pdf!
            </div>
        </div>
    )
}