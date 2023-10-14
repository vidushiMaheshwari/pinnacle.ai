import axios from "axios";

export const BASE_URL = "http://127.0.0.1:5000";


export async function send_data(data, url) {
    const apiurl = `${BASE_URL}/${url}`
    return await axios.post(
      apiurl,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
 
export async function get_data(url, data) {
  console.log(data);
    const apiurl = `${BASE_URL}/${url}`
    return await axios.get(
        apiurl,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
        },
      );
}