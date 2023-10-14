import React from "react";
import { colleges } from "../../constants/colleges";
import Autocomplete from '@mui/material/Autocomplete';
import { Button, TextField } from "@mui/material";
import { topics } from "../../constants/topics";
import classes from "./Home.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export const Home = () => {
    const [college, setCollege] = useState("")
    const [topic, setTopic] = useState("")
    const [runBtnValue, setRunBtnValue] = useState("Explore All")
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/module', {state: {topic, college}});
    }


    useEffect(() => {
        // Update the document title using the browser API
        if (topic === "" && college === "") {
            setRunBtnValue("Explore All");
        } else if (topic === "") {
            setRunBtnValue("Explore College");
        } else if (college === "") {
            setRunBtnValue("Explore Topic");
        } else {
            setRunBtnValue("Explore");
        }
      }, [topic, college]);


    return (
        <div className="Body">
            <div className={classes.heading}>
                pinnacle.ai
            </div>
            <div className={classes.description}>Your personal AI buddy</div>

            <hr className={classes.divider}/>

            <div className={classes.options}>
            <Autocomplete 
            disablePortal
            className="college-option"
            options={colleges}
            sx={{ width: 300 }}
            onChange={setCollege}
            renderInput={(params) => <TextField {...params} label="College" />}/>
            
            <Autocomplete 
            disablePortal
            className="topic-option"
            options={topics}
            sx={{ width: 300 }}
            onChange={setTopic}
            renderInput={(params) => <TextField {...params} label="Topic" />}/>

            <Button color="success" variant="contained" onClick={handleButtonClick}> {runBtnValue} </Button>
</div>
        </div>
    )
}