import callAPILogin from "./CallAPILogin";

function Login_RegisterAPI() {

    // [LOGIN] 
    this.loginCall = (data) => {
        return callAPILogin.post('users/login', data);
    }

    // [REGISTER]
    this.registerCall = (data) => {
        return callAPILogin.post("users/register", data);
    }
}

export default new Login_RegisterAPI()