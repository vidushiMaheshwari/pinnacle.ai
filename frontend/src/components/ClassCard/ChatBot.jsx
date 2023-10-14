// CustomChatbot.js
import React from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";

const steps = [
  // Define your chatbot conversation steps here.
  // For example:
  { id: "1", message: "Hello, how can I assist you?", trigger: "2" },
  { id: "2", user: true, trigger: (value) => {
    if (value.toLowerCase() === "help") {
      return "helpStep";
    } else {
      return "otherStep";
    }
  }},
    { id: "helpStep", message: "I'm here to help", trigger: "2" },
  { id: "3", message: "You said: {previousValue}", trigger: "2" },
];

const customChatbotTheme = {
  // Define your chatbot theme here.
  // You can customize the appearance of the chatbot.
  background: "white", // Background color
  fontFamily: "Arial, sans-serif", // Font family
  headerBgColor: "#40ECBB", // Header background color
  headerFontColor: "white", // Header font color
  botBubbleColor: "#40ECBB", // Bot message bubble color
  botFontColor: "white", // Bot message font color
  userBubbleColor: "green", // User message bubble color
  userFontColor: "white", // User message font color
};

const CustomChatbot = () => {
  return (
    <ThemeProvider theme={customChatbotTheme}>
      <ChatBot steps={steps} />
    </ThemeProvider>
  );
};

export default CustomChatbot;
