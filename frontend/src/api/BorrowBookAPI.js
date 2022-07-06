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

    // [GET] - search theo admin
    this.searchAdmin = (data) => {
        return callAPI.post('borrowbooks/search', data);
    }

    //[POST] - Tạo đơn sách chờ duyệt
    this.awaitBorrowBook = (data) => {
        return callAPI.post('borrowbooks/awaitBorrowBook', data);
    }

    //[POST] - Duyệt đơn sách chờ duyệt
    this.acceptBorrowBook = (data) => {
        return callAPI.post('borrowbooks/acceptBorrowBook', data);
    }

    //[POST] - Tạo đơn trả
    this.refurnBorrowBook = (data) => {
        return callAPI.post('borrowbooks/refurn', data);
    }

    //[POST] - Sách quá hạn
    this.outOfDateBorrowbook = () => {
        return callAPI.get('borrowbooks/outOfDateBorrowbook');
    }
}

export default new BorrowBookAPI()