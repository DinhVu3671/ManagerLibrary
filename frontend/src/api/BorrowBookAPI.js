import callAPI from "./CallAPI";

function BorrowBookAPI() {

    // [POST]  - create
    this.createBook = (data) => {
        return callAPI.post('borrowbooks/create', data);
    }

    // [GET] - book by Id
    // this.getBookById = (id) => {
    //     return callAPI.get(`books/show/${id}`);
    // }

    //[POST] - gia hạn sách
    this.editBook = (data, id) => {
        return callAPI.post(`borrowbooks/edit/${id}`, data);
    }

    //[GET] - list theo user
    this.listByUser = (id) => {
        return callAPI.get(`borrowbooks/list/${id}`);
    }

    // //[GET] - list user
    // this.listBook = () => {
    //     return callAPI.get('books/list')
    // }

    // //[POST] - search
    // this.searchBook = (data) => {
    //     return callAPI.post('books/search', data);
    // }
}

export default new BorrowBookAPI()