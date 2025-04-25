import axios from "axios";
 
 
const authAxios = axios.create({
    baseURL: "https://localhost:7167",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
});
 
 
 
export default authAxios;