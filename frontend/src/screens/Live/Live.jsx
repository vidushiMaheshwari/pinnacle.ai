// Live.jsx

import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import {ChatBotLive} from "../../components/ChatBot/ChatBotLive";
import {ChatBot} from "../../components/ChatBot/ChatBot";
import classes from './Live.module.css';
import encodeWAV from 'wav-encoder';
import { get_data, send_data } from "../../util/connection";


export const Live = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState(null); // Store the video ID

  const handleInputChange = (e) => {
    setYoutubeUrl(e.target.value);
  };

  const CHUNK_DURATION = 5  * 1000; // 5 minutes in milliseconds

  const handleEmbedClick = async () => {
    // Basic URL validation
    if (youtubeUrl && youtubeUrl.includes('youtube.com')) {
      // Extract video ID from URL
      const url = new URL(youtubeUrl);
      const videoId = url.searchParams.get('v');

      if (videoId) {
        // Set the video ID in the state
        setVideoId(videoId);
        console.log("I now have a video ID")
        const lis = await send_data({videoId}, 'start-recording')
      }
    } else {
      // Handle invalid URL
      alert('Invalid YouTube URL');
    }
  };

//   useEffect(() => {
//     async function createModel() {
//         await send_data("live", '/model_live');
//     }
//     createModel(); // Now backend has a AI model
// }, [])
  return (
    // <div>
    //   <h1>Live Lecture Page</h1>
    //   <div className={classes.chatbot}><ChatBotLive props={{lectureId: "live", lectureName: "live_lecture"}}></ChatBotLive></div>
      
    //   <div>
    //     <input
    //       type="text"
    //       placeholder="Enter YouTube URL"
    //       value={youtubeUrl}
    //       onChange={handleInputChange}
    //     />
        
    //   <button onClick={handleEmbedClick}>Embed</button>
    //   </div>
    //   {/* <ChatBot props={{lectureId: "live", lectureName: "live_lecture"}}></ChatBot> */}
       
    //   {videoId && (
    //     <div>
    //       <YouTube videoId={videoId} />
    //     </div>
    //   )} 

    // </div>
    <div className={classes.container}>
      <h1 className={classes.heading}>pinnacle.ai</h1>
      <h2 className={classes.subheading}>Live Lecture</h2>

      <div className={classes.inputContainer}>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={youtubeUrl}
          onChange={handleInputChange}
          className={classes.input}
        />
        <button onClick={handleEmbedClick} className={classes.embedButton}>Embed</button>
      </div>
      <div className={classes.chatbot}><ChatBotLive props={{lectureId: "live", lectureName: "live_lecture"}}></ChatBotLive></div>
      {videoId && (
        <div className={classes.youtubeContainer}>
          <YouTube videoId={videoId} />
        </div>
      )}
    </div>
    
  );
};

