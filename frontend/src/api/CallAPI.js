import axios from 'axios';


const getToken = JSON.parse(sessionStorage.getItem("token"));
const callAPI = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    headers: {
        Authorization: `Bearer ${getToken}`,
        "Content-type": 'application/json'
    }
})
export default callAPI;