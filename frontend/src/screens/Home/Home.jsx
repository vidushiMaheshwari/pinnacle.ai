import React from "react";
import { colleges } from "../../constants/colleges";
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Switch, TextField, FormControlLabel } from "@mui/material";
import { topics } from "../../constants/topics";
import classes from "./Home.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChatBot } from "../../components/ChatBot/ChatBot";
import { get_data, send_data } from "../../util/connection";
import { HorizontalCards } from "./HorizontalCards/HorizontalCards";

export const Home = () => {
    const [college, setCollege] = useState("")
    const [topic, setTopic] = useState("")
    const [runBtnValue, setRunBtnValue] = useState("Explore All")
    const [cardList, setCardList] = useState([]);
    const navigate = useNavigate();

    const handleButtonClick = async () => {
        // I will update the horizontal bar at the bottom
        const lis = await send_data({college, topic}, 'filter')
        // console.log("coming from backend...")
        if (lis.data.success) {
            setCardList(lis.data.success);
        }
    }

    useEffect(() => {
        async function getAll() {
            return await handleButtonClick();
        }
        getAll();
    }, [])

    const switchToLive = () => {
        navigate('/live');
    }


    return (
        <div className="Body">
            <FormControlLabel className={classes.liveModeSwitch} control={<Switch onChange={switchToLive} />} label="Switch To Live Mode" />
            
            <div className={classes.heading}>
                pinnacle.ai
            </div>
            <div className={classes.description}>Your personal Teaching Assistant</div>

            <hr className={classes.divider}/>
                {/* <div className={classes.chatbot}>
             <ChatBot />
             </div> */}
            <div className={classes.options}>
            <Autocomplete 
            disablePortal
            className="college-option"
            options={colleges}
            sx={{ width: 300 }}
            onChange={(e, v) => setCollege(v)}
            renderInput={(params) => <TextField {...params} label="College" />}/>
            
            <Autocomplete 
            disablePortal
            className="topic-option"
            options={topics}
            sx={{ width: 300 }}
            onChange={(e, v) => setTopic(v)}
            renderInput={(params) => <TextField {...params} label="Topic" />}/>

            <Button color="success" variant="contained" onClick={handleButtonClick}> Explore All </Button>
</div>
<HorizontalCards cards={cardList}/>
        </div>
    )
}