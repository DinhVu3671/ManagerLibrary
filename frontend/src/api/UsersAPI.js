import callAPI from "./CallAPI";

function UsersAPI() {

    // [GET]  - show all
    this.getAllUsers = () => {
        return callAPI.get('users/show');
    }

    // [GET] - user by Id
    this.getUserById = (id) => {
        return callAPI.get(`users/showUser/${id}`);
    }

    //[POST] - edit user info
    this.editUserInfo = (data) => {
        return callAPI.post('users/edit', data);
    }

    //[POST] - change pass
    this.changePass = (data) => {
        return callAPI.post('users/change-password', data);
    }

    //[POST] - search
    this.searchUsers = (data) => {
        return callAPI.post('users/search', data);
    }
}

export default new UsersAPI()