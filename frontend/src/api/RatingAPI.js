import callAPI from "./CallAPI";

function RatingAPI() {

    // // [POST]  - create
    // this.createComment = (idBook, data) => {
    //     return callAPI.post(`comment/create/${idBook}`, data);
    // }

    // [GET] - show
    this.getRatingForBook = (idBook) => {
        return callAPI.get(`rating/bookInfo/${idBook}`);
    }

}

export default new RatingAPI()