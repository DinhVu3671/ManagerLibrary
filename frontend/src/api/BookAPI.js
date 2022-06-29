import callAPI from "./CallAPI";

function BookAPI() {

    // [POST]  - create
    this.createBook = (data) => {
        return callAPI.post('books/create', data);
    }

    // [GET] - book by Id
    this.getBookById = (id) => {
        return callAPI.get(`books/show/${id}`);
    }

    //[POST] - edit book info
    this.editBook = (data, id) => {
        return callAPI.post(`books/edit/${id}`, data);
    }

    //[GET] - xoá
    this.deleteBook = (data, id) => {
        return callAPI.get(`books/delete/${id}`, data);
    }

    //[GET] - list user
    this.listBook = () => {
        return callAPI.get('books/list')
    }

    //[POST] - search
    this.searchBook = (data) => {
        return callAPI.post('books/search', data);
    }
}

export default new BookAPI()