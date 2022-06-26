import callAPI from "./CallAPI";

function Login_RegisterAPI() {

    // [LOGIN] 
    this.loginCall = (data) => {
        return callAPI.post('users/login', data);
    }

    // [REGISTER]
    this.registerCall = (data) => {
        return callAPI.post("users/register", data);
    }
}

export default new Login_RegisterAPI()