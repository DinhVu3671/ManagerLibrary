import Header from './header';
import Footer from './footer';
import styles from '../screens/CSS/home.module.css';
import React, { useEffect, useState, useRef, memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import stylesBookManger from '../components/CSS/bookManager.module.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import clsx from 'clsx';
import axios from '../config/axios';
import MuiAlert from '@mui/material/Alert';
import ImageUploader from '../components/imageUploader';
import imageTest from '../assets/testproduct.jpg'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defautlAvatar =
  'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';

function BookManager(books) {
    const posts = [
      {id: "1", title: "Mo hinh 1", type: "Romance", writter: "DTV", solded: 3, count: 100, rating: 4.3, ratingCount: 123, description: "Mo hinh de thuong", year: 2012, lastUpdate: "15:30:00 15/5/2022"},
      {id: "2", title: "Mo hinh 2", type: "Romance", writter: "DTV", solded: 1, count: 130, rating: 4.7, ratingCount: 123, description: "Mo hinh best", year: 2018, lastUpdate: "15:30:00 15/5/2022"},
      {id: "3", title: "Mo hinh 3", type: "Romance", writter: "DTV", solded: 2, count: 160, rating: 4.5, ratingCount: 123, description: "Mo hinh nho nhan", year: 2019, lastUpdate: "15:30:00 15/5/2022"},
      {id: "4", title: "Mo hinh 4", type: "Comody", writter: "DTV", solded: 3, count: 120, rating: 4.1, ratingCount: 123, description: "Mo hinh de thuong", year: 2020, lastUpdate: "15:30:00 15/5/2022"}
    ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpenInforBook(false);
      setOpen(true);
      setTitle('');
      setType('');
      setWritter('');
      setCount(0);
      setDescription('');
      setYear(1900);
      setAvatarImg(defautlAvatar);
      setErrMsg('');
      setSuccess(false);
      setTextTitle("Nhập thông tin sách");
      setTextButtonRight("Huỷ")
    };
    const handleClose = () => {
      setOpen(false);
      setOpenInforBook(false);
    };

    const [openInforBook, setOpenInforBook] = useState(false);
    const handleOpenInforBook = (book) => {
      setOpenInforBook(true);
      setOpen(true);
      setId(book.id)
      setTitle(book.title);
      setType(book.type);
      setWritter(book.writter);
      setSolded(book.solded);
      setCount(book.count);
      setRating(book.rating);
      setRatingCount(book.ratingCount);
      setDescription(book.description);
      setYear(book.year);
      setLastUpdate(book.lastUpdate);
      setAvatarImg(imageTest);
      setErrMsg('');
      setSuccess(false);
      setTextTitle("Thông tin sách");
      setTextButtonRight("Đóng")
    };

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [writter, setWritter] = useState('');
    const [solded, setSolded] = useState(0);
    const [count, setCount] = useState(0);
    const [rating, setRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const [description, setDescription] = useState('');
    const [year, setYear] = useState(1900);
    const [lastUpdate, setLastUpdate] = useState('');
    const [avatarImg, setAvatarImg] = useState(defautlAvatar);
    const [textTitle, setTextTitle] = useState('');
    const [textButtonRight, setTextButtonRight] = useState('');

    // info
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
      //console.log(avatarImg);

    const handleCloseAvatar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
      setErrMsg('');
    };

    const [openDelete, setDelete] = useState(false);
    const handleOpenDelete = () =>  setDelete(true);
    const handleCloseDelete = () =>  setDelete(false);

    //submit product
    const handleSubmit = async (e) => {
      e.preventDefault();
      const REGISTER_URL = `/api/v1/registerProduct`;
  
      if (errMsg === '') {
        //console.log(avatarImg);
        let data = {};
        data = {
          title: title,
          writter: writter,
          year: year,
          description: description,
          count: count,
          type: type,
          avatar: avatarImg,
        };
        console.log(data);
        try {
          const response = await axios.post(REGISTER_URL, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json',
            },
            // withCredentials: true,
          });
          console.log(JSON.stringify(response?.data));
          console.log(JSON.stringify(response));
          setSuccess(true);
        } catch (err) {
          if (!err?.response) {
            setErrMsg('No Server Response');
            setOpen(true);
          } else {
            setErrMsg('Thêm sách.');
            console.log(err);
            setOpen(true);
          }
        }
      }
    };

    useEffect(() => {
      if (errMsg !== '') {
        setOpen(true);
      }
    }, [errMsg]);

    return (
      <div className={styles.Home}>
        <Header />

        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box  className={stylesBookManger.box}>
              <Modal
              open={openDelete}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              >
                  <Box  className={stylesBookManger.deletebox}>
                    <div className={styles.wraper}>  
                        <p className={stylesBookManger.formdelete}> Xác nhận xoá ? </p>
                    </div>
                    <div className={stylesBookManger.button}>
                      <Button onClick={handleCloseDelete}> Huỷ </Button>
                      <Button onClick={handleSubmit}>Xác nhận</Button>
                    </div>
                  </Box>
            </Modal>
            <div className={stylesBookManger.wraper}>  
                <p> {textTitle} </p>
            </div>

            <div className={stylesBookManger.row}>
              <div className={stylesBookManger.flex}>
                <div className={stylesBookManger.row2}>
                  { openInforBook && (
                  <div className={clsx(stylesBookManger.formRow)}>
                    <label
                      htmlFor="id"
                      className={clsx(stylesBookManger.formLabel, stylesBookManger.row11)}
                    >
                    ID:
                    </label>
                    <input
                      id="id"
                      name="id"
                      value={id}
                      type="text"
                      className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                      required
                      readOnly
                    />
                  </div>
                  )}
                  
                  <div className={clsx(stylesBookManger.formRow)}>
                    <label
                      htmlFor="name"
                      className={clsx(stylesBookManger.formLabel, stylesBookManger.row11)}
                    >
                    Tên sách
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      type="text"
                      className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                      placeholder="Tên sách..."
                      required
                    />
                  </div>

                  <div className={clsx(stylesBookManger.formRow)}>
                    <label
                      htmlFor="type"
                      className={clsx(stylesBookManger.formLabel, stylesBookManger.row11)}
                    >
                      Thể loại:
                    </label>
                    <input
                      id="type"
                      name="type"
                      type="text"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                      required
                    />
                  </div>

                  <div className={clsx(stylesBookManger.formRow)}>
                    <label
                      htmlFor="type"
                      className={clsx(stylesBookManger.formLabel, stylesBookManger.row11)}
                    >
                      Tác giả:
                    </label>
                    <input
                      id="type"
                      name="type"
                      type="text"
                      value={writter}
                      onChange={(e) => setWritter(e.target.value)}
                      className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                      required
                    />
                  </div>
                </div>

                <div className={clsx(stylesBookManger.avatarInput, stylesBookManger.col)}>
                  <ImageUploader
                    avatarImg={avatarImg}
                    onAvatarChange={setAvatarImg}
                  />
                </div>
              </div>

              <div className={clsx(stylesBookManger.formRow)}>
                <label
                  htmlFor="count"
                  className={clsx(stylesBookManger.formLabel, stylesBookManger.row1)}
                >
                  Số lượng:
                </label>
                <input
                  id="count"
                  name="count"
                  type="number"
                  min="1"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                  required
                />
              </div>

              <div className={clsx(stylesBookManger.formRow)}>
                <label
                  htmlFor="year"
                  className={clsx(stylesBookManger.formLabel, stylesBookManger.row1)}
                >
                  Năm:
                </label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  min="1900"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                  required
                />
              </div>
              
              <div className={clsx(stylesBookManger.formRow)}>
                <label
                  htmlFor="description"
                  className={clsx(stylesBookManger.formLabel, stylesBookManger.row1)}
                >
                  Mô tả:
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                  required
                />
              </div>



              { openInforBook && (
                <div>
                  <div className={clsx(stylesBookManger.formRow)}>
                    <label
                      htmlFor="rating"
                      className={clsx(stylesBookManger.formLabel, stylesBookManger.row1)}
                    >
                      Đánh giá:
                    </label>
                    <input
                      id="rating"
                      name="rating"
                      value={rating}
                      type="text"
                      className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                      required
                      readOnly
                    />
                  </div>

                  <div className={clsx(stylesBookManger.formRow)}>
                    <label
                      htmlFor="ratingCount"
                      className={clsx(stylesBookManger.formLabel, stylesBookManger.row1)}
                    >
                      Số lượt đánh giá:
                    </label>
                    <input
                      id="ratingCount"
                      name="ratingCount"
                      value={ratingCount}
                      type="text"
                      className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                      required
                      readOnly
                    />
                  </div>

                  <div className={clsx(stylesBookManger.formRow)}>
                  <label
                    htmlFor="solded"
                    className={clsx(stylesBookManger.formLabel, stylesBookManger.row1)}
                  >
                    Đã cho mượn:
                  </label>
                  <input
                    id="solded"
                    name="solded"
                    value={solded}
                    type="text"
                    className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                    required
                    readOnly
                  />
                  </div>

                  <div className={clsx(stylesBookManger.formRow)}>
                    <label
                      htmlFor="lastUpdate"
                      className={clsx(stylesBookManger.formLabel, stylesBookManger.row1)}
                    >
                      Cập nhật lần cuối:
                    </label>
                    <input
                      id="lastUpdate"
                      name="lastUpdate"
                      type="text"
                      value={lastUpdate}
                      className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                      readOnly
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={stylesBookManger.button}>
              <Button onClick={handleClose}> {textButtonRight} </Button>
              {openInforBook && <Button onClick={handleOpenDelete}>Xoá sách</Button>}
              <Button onClick={handleSubmit}>Xác nhận</Button>
            </div>
            
          </Box>
        </Modal>


        <div className={styles.content} >
          <div className={styles.wraper}>
            <div className={stylesBookManger.tdisplay}>  
                <p>Quản lý sách</p>
                <Button href="#text-buttons" onClick={handleOpen}>Thêm sách</Button>
            </div>
            
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell> ID </TableCell>
                    <TableCell align="right"> Tên sách </TableCell>
                    <TableCell align="right"> Tác giả </TableCell>
                    <TableCell align="right"> Thể loại </TableCell>
                    <TableCell align="right"> Năm </TableCell>
                    <TableCell align="right"> Đã mượn </TableCell>
                    <TableCell align="right"> Tổng </TableCell>
                    <TableCell align="right"> Đánh giá </TableCell>
                    <TableCell align="right"> Cập nhật lần cuối </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.map((book) => (
                    <TableRow
                      key={book.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {book.id}
                      </TableCell>
                      <TableCell align="right"><Button onClick={() => handleOpenInforBook(book)}>{book.title}</Button></TableCell>
                      <TableCell align="right">{book.writter}</TableCell>
                      <TableCell align="right">{book.type}</TableCell>
                      <TableCell align="right">{book.year}</TableCell>
                      <TableCell align="right">{book.solded}</TableCell>
                      <TableCell align="right">{book.count}</TableCell>
                      <TableCell align="right">{book.rating}</TableCell>
                      <TableCell align="right">{book.lastUpdate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  export default BookManager;