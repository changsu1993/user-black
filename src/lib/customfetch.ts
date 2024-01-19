import axios from "axios";
const customFetch = axios.create({
    headers:{
        "Content-Type":"application/json"
    },
  baseURL: "http://3.35.139.125:3000/",
});

export default customFetch;