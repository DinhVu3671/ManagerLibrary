import callAPI from "./CallAPI";

function CategoriesAPI() {

    // [POST]  - create
    this.createCategory = (data) => {
        return callAPI.post('categories/create', data);
    }

    // [GET] - show
    this.getCategories = () => {
        return callAPI.get(`categories/show`);
    }

    // //[POST] - edit book info
    // this.editBook = (data, id) => {
    //     return callAPI.post(`books/edit/${id}`, data);
    // }

    // //[GET] - xoá
    // this.deleteBook = (data, id) => {
    //     return callAPI.get(`books/delete/${id}`, data);
    // }

    // //[GET] - list user
    // this.listBook = () => {
    //     return callAPI.get('books/list')
    // }

    // //[POST] - search
    // this.searchBook = (data) => {
    //     return callAPI.post('books/search', data);
    // }
}

export default new CategoriesAPI()