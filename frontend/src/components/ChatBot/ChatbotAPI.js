import { send_data } from "../../util/connection";

const API = {
    GetChatbotResponse: async (userinput, lectureId, lectureName) => {
      return new Promise(function(resolve, reject) {
        setTimeout(async function() {
            // if (userinput === "hi") {
            //     resolve(`Hello! Ask me anything about ${lectureName}`)
            // } else {
            //     resolve("Sorry, I didn't understand that. Could you please repeat?")
            // }
            try {
              const res = await send_data({userinput, lectureId}, '/bot/user_chat');
            if (!res.data.message || res.data.message === undefined) {
                    resolve("Sorry, there were some internal errors. Could you please repeat?")
                  } 
          else resolve(res.data.message);  
            } catch (error) {
              
            }
            
        }, 20);
      });
    }
  };
  
export default API;
  