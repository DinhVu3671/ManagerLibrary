import callAPI from "./CallAPI";

function CommentAPI() {

    // [POST]  - create
    this.createComment = (idBook, data) => {
        return callAPI.post(`comment/create/${idBook}`, data);
    }

    // [GET] - show
    this.getComment = (idBook) => {
        return callAPI.get(`comment/list/${idBook}`);
    }

}

export default new CommentAPI()