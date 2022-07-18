# Phần mềm hỗ trợ quản lý thư viện

## Các công nghệ được sử dụng
### ReactJs
### NodeJs
### MongoDB
## Tính năng :

### 1.Vai trò Khách
    1. Vai trò khách có thể đăng ký, đăng nhập vào hệ thống
    2. Người dùng chưa đăng nhập có thể xem danh sách sách
    3. Người dùng chưa đăng nhập có thể tìm kiếm và xem chi tiết sách

### 2. Vai trò là người dùng đã đăng nhập vào hệ thống
    1. Người dùng có thể xem danh sách sách
    2. Người dùng có thể tìm kiếm và xem chi tiết sách
    3. Người dùng có thể thêm sách vào giỏ hàng để có thể đăng ký mượn
    4. Người dùng có thể đăng ký mượn sách online với thời hạn mượn là 30 ngày kể từ ngày đơn mượn được duyệt
    5. Người dùng có thể xem danh sách những sách đã mượn, đang mượn và đang đợi duyệt
    6. Người dùng có thể xem, chỉnh sửa thông tin cá nhân
    7. Người dùng có thể đổi mật khẩu tài khoản người dùng  

### 3. Vai trò là Admin hệ thống 
    1. Admin có thể xem danh sách sách
    2. Admin có thể tìm kiếm và xem chi tiết sách
    3. Admin có thể thêm thể loại sách
    4. Admin có thể thêm mới, cập nhật, xoá sách
    5. Admin có thể xem danh sách sách đang mượn theo người dùng
    6. Admin có thể xem danh sách sách đang chờ duyệt mượn theo người dùng
    7. Admin có thể xem danh sách sách đang mượn quá hạn theo người dùng
    8. Admin có thể tạo phiếu mượn sách
    9. Admin có thể tạo phiếu trả sách
    10. Admin có thể duyệt phiếu mượn sách online
    11. Admin có thể xem danh sách người dùng

## Hướng dẫn sử dụng : 
### Server NodeJs App:

    1. Download project
    2. Mở project bằng các phần mềm editor như [Vs Code](https://code.visualstudio.com/) or [Atom](https://atom.io/)
    3. Dẫn đến thư mục `Back-End` và mở Terminal, run the command `npm install`
    4. Sử dụng [MongoDB Atlas](https://cloud.mongodb.com/) để kết nối CSDL của bạn và thay thể đường dẫn trong file index.js
    5. Mở Terminal, run command `npm start` để khởi chạy back_end, sẽ được khởi chạy tại `http://localhost:8000/`

### Client React App Setup:

    1. Dẫn đến thư mục `Front-End` và mở Terminal, run the command `npm install`

    2. Sau đó ở terminal, run the command `npm start`
    3. Project sẽ khởi chạy giao diện tại `http://localhost:3000/` 