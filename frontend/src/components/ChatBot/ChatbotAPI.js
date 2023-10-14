import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";
const apiurl = `${BASE_URL}/bot/user_chat`;

async function send_data(value, lectureId) {
  return await axios.post(
    apiurl,
    { value , lectureId},
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  );
}


const API = {
    GetChatbotResponse: async (userinput, lectureId, lectureName) => {
      return new Promise(function(resolve, reject) {
        setTimeout(async function() {
            if (userinput === "hi") {
                resolve(`Hello! Ask me anything about ${lectureName}`)
            }
            const res = await send_data(userinput, lectureId);
            if (!res.data.message || res.data.message === undefined) {
                    resolve("Sorry, there were some internal errors. Could you please repeat?")
                  } 
          else resolve(res.data.message);
        }, 20);
      });
    }
  };
  
export default API;
  