import axios from 'axios';


const getToken = JSON.parse(localStorage.getItem('token'));
console.log(getToken);
// console.log(JSON.parse(localStorage.getItem("token")))
const callAPI = axios.create({
    baseURL: 'http://localhost:8000/api/v1/',
    headers: {
        Authorization: `Bearer ${getToken}`,
        "Content-type": 'application/json'
    }
})
export default callAPI;