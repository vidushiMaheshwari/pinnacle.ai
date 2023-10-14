// Live.jsx

import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import { ChatBot } from '../../components/ChatBot/ChatBot';
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




  
  // Function to stop recording audio

  


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

  return (
    <div>
      <h1>Live Lecture Page</h1>
      <div>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={youtubeUrl}
          onChange={handleInputChange}
        />
        
        <button onClick={handleEmbedClick}>Embed</button>
      </div>
      {/* Render the YouTube video based on the videoId */}
      {videoId && (
        <div>
          <YouTube videoId={videoId} />
        </div>
      )}

    </div>
    
  );
};

export default Live;
