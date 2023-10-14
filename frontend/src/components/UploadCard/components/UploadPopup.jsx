import React, { useState } from "react";
import { UploadCardDropzone } from "../UploadCardDropzone";
import classes from './UploadPopup.module.css';
import Autocomplete from '@mui/material/Autocomplete';
import { colleges } from "../../../constants/colleges";
import { TextField } from "@mui/material";
import SmallAutoComplete from "./SmallAutoComplete";
import { topics } from "../../../constants/topics";

export const UploadPopup = () => {
    const [college, setCollege] = useState();

    return (
        <div className={classes.body}>
            <div className={classes.content}>
            <div className={classes.heading}> Add New Lecture Slides</div>
            <hr />
            <div className={classes.input}>
                Enter the college where the notes are from &nbsp; &nbsp; &nbsp; <SmallAutoComplete options={colleges} />
            </div>
            <br />
            <div className={classes.input}>
                Enter the suitable topic of notes &emsp; &emsp; &emsp; &emsp; &emsp; <SmallAutoComplete options={topics} />
            </div>
            <br />
            <div className={classes.input}>
                Enter a suitable topic of notes &emsp; &nbsp; &nbsp; &emsp; &emsp; &emsp; &emsp; <SmallAutoComplete options={topics} />
            </div>

            <br />
            <br />

            <UploadCardDropzone />
            </div>
        </div>
    )
}