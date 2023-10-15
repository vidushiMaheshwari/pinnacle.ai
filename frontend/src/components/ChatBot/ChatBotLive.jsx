import React, { useState, useEffect } from "react";
import BotMessage from "./components/BotMessage";
import UserMessage from "./components/UserMessage";
import Messages from "./components/Messages";
import Input from "./components/Input";

import API from "./ChatbotAPILive";

// import "./styles.css";
import Header from "./components/Header";

export const ChatBotLive = (props) => {
  const [messages, setMessages] = useState([]);
  const {lectureName, lectureId} = props.props;

  useEffect(() => {
    async function loadWelcomeMessage() {
        try {
            setMessages([
                <BotMessage
                  key="0"
                  fetchMessage={async () => await API.GetChatbotLiveResponse("hi", lectureId, lectureName)}
                />
              ]);
        } catch (error) {
            console.log(error)
        }
      
    }
    loadWelcomeMessage();
  }, []);

  const send = async text => {
    try {
        const newMessages = messages.concat(
            <UserMessage key={messages.length + 1} text={text} />,
            <BotMessage
              key={messages.length + 2}
              fetchMessage={async () => await API.GetChatbotLiveResponse(text, lectureId, lectureName)}
            />
          );
          setMessages(newMessages);
    } catch (error) {
        console.log(error)
    }
    
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={(input) => {
        console.log(input);
        send(input);
      }} />
    </div>
  );
}