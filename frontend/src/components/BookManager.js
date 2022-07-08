import Header from './header';
import Footer from './footer';
import styles from '../screens/CSS/home.module.css';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import stylesBookManger from '../components/CSS/bookManager.module.css'
import styleBookReader from '../components/CSS/BookReaderItem.module.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import clsx from 'clsx';
import ImageUploader from '../components/imageUploader';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import stylesTab from './CSS/orderBook.module.css';
import InformationTab from './InfomationTab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CategoriesAPI from '../api/CategoriesAPI';
import BookAPI from '../api/BookAPI';
import SearchBar from "material-ui-search-bar";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const defautlAvatar =
  'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';


//sorty
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: 'title', numeric: false, disablePadding: false, label: 'Tên sách' },
  { id: 'writter', numeric: false, disablePadding: false, label: 'Tác giả' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Thể loại' },
  { id: 'year', numeric: true, disablePadding: false, label: 'Năm' },
  { id: 'solded', numeric: true, disablePadding: false, label: 'Đã mượn' },
  { id: 'count', numeric: true, disablePadding: false, label: 'Tổng' },
  { id: 'rating', numeric: true, disablePadding: false, label: 'Đánh giá' },
]

function stableSort(array, compare) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = compare(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property) => (event) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function BookManager(books) {
  const [categories, setCategories] = useState([]);
  const [bookList, setBooks] = useState([]);

  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const [searched, setSearched] = useState("");
  const [data, setData] = useState([]);

  const handleOpen = async () => {
    let categoriesRes = await CategoriesAPI.getCategories().then(res => {
      return res.data;
    })

    if (categoriesRes.data && categoriesRes.data.length > 0) {
      console.log("categoriesRes")
      setCategories(categoriesRes.data)
    }
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
  const handleOpenInforBook = async (book) => {
    let categoriesRes = await CategoriesAPI.getCategories().then(res => {
      return res.data;
    })

    if (categoriesRes.data && categoriesRes.data.length > 0) {
      // console.log("categoriesRes")
      setCategories(categoriesRes.data)
    }
    setOpenInforBook(true);
    setOpen(true);
    setId(book._id);
    setTitle(book.title);
    setType(book.categories[0]._id);
    setWritter(book.author);
    setSolded(book.total - book.availableNumber);
    setCount(book.availableNumber);
    setRating(book.numberStar.$numberDecimal);
    setRatingCount(book.numberRate);
    setDescription(book.description);
    setYear(book.publishYear);
    setLastUpdate(book.updatedAt);
    setAvatarImg(book.images);
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

  const [newCategory, setNewCategory] = useState('');
  // info
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  //console.log(avatarImg);

  const [page, setPage] = useState(0);
  // const [warehouse, setWareW]

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (
    event,
    property,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookList.length) : 0;
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
  };

  // select tyoe
  const handleChange = (e) => {
    setType(e.target.value);
  };

  const [openDelete, setDelete] = useState(false);
  const handleOpenDelete = () => setDelete(true);
  const handleCloseDelete = () => setDelete(false);
  const handleOpenNewCategory = () => {
    setOpenCategory(true)
    setNewCategory('')
  }
  //submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errMsg === '') {
      let data = {};
      let img = []
      img.push(avatarImg);
      data = {
        title: title,
        author: writter,
        publishYear: year,
        description: description,
        total: count + solded,
        categories: type,
        images: avatarImg,
        availableNumber: count
      };
      try {
        if (!openInforBook) {
          const response = await BookAPI.createBook(data);
          setSuccess(true);
          setOpen(false);
        } else {
          const response = await BookAPI.editBook(data, id);
          setSuccess(true);
          setOpen(false);
        }
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

  const handleAddCategory = async () => {
    try {
      console.log(newCategory);
      const response = await CategoriesAPI.createCategory({ name: newCategory });
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      setOpenCategory(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
        // setOpen(true);
      } else {
        setErrMsg('Thêm sách.');
        console.log(err);
        // setOpen(true);
      }
    }
  }
  function getData() {
    BookAPI.listBook().then((res) => {
      let bookListRes = res.data;
      console.log(bookListRes);
      setBooks(bookListRes.data.reverse());
      setData(bookListRes.data.reverse())
    })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData();
  }, [success]);
  useEffect(() => {
    if (errMsg !== '') {
      setOpen(true);
    }
  }, [errMsg]);


  const requestSearch = (searchedVal) => {
    const filteredRows = bookList.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  console.log(categories);
  return (
    <div className={styles.Home}>
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
         Đã thêm thành công
        </Alert>
      </Snackbar>
      <Header />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={stylesBookManger.box}>
          <Modal
            open={openDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={stylesBookManger.deletebox}>
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
                  <FormControl className={clsx(stylesBookManger.formInput, stylesBookManger.row)}>
                    <InputLabel id="demo-simple-select-label">Thể loại </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={type}
                      label="Thể loại"
                      onChange={handleChange}
                    >
                      {categories?.map((item, index) => {
                        return (
                          <MenuItem value={item._id}>{item.name}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
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



            {openInforBook && (
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
                    value={(new Date(lastUpdate)).toLocaleString()}
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

      <Modal
        open={openCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styleBookReader.commentBox}>
          <div className={styles.wraper}>
            <p className={stylesBookManger.formdelete}> Danh mục mới </p>
          </div>
          <div className={stylesBookManger.formdelete}>
            <input
              id="newCategory"
              name="newCategory"
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
              placeholder="Tên danh mục ..."
              required
            />
            <div className={stylesBookManger.footFake2}>
              <p>  </p>
            </div>
          </div>
          <div className={stylesBookManger.button}>
            <Button onClick={() => setOpenCategory(false)}> Huỷ </Button>
            <Button onClick={handleAddCategory}>Xác nhận</Button>
          </div>
        </Box>
      </Modal>

      <div className={stylesTab.content} >
        <div className={stylesTab.tab1} >
          <InformationTab />
        </div>

        <div className={stylesTab.tab2} >
          <div className={styles.wraper}>
            <div className={stylesBookManger.tdisplay}>
              <p>Quản lý sách</p>

              <div className={clsx(stylesBookManger.searchBar)}>
                <SearchBar
                  value={searched}
                  onChange={(searchVal) => requestSearch(searchVal)}
                  onCancelSearch={() => cancelSearch()}
                  placeholder="Tìm tên sách . . ."
                />
              </div>

              <Button href="#text-buttons" onClick={handleOpenNewCategory}>Thêm danh mục</Button>
              <Button href="#text-buttons" onClick={handleOpen}>Thêm sách</Button>
            </div>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {data.slice().sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((book, index) => {
                      const isItemSelected = isSelected(book.id);

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, book.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={book.id}
                          selected={isItemSelected}
                        >
                          <TableCell align="left" component="th" scope="row"><Button onClick={() => handleOpenInforBook(book)}>{book.title}</Button></TableCell>
                          <TableCell align="left">{book.author}</TableCell>
                          <TableCell align="left">
                            {book.categories?.map(item => {
                              return (
                                <div>{item.name}</div>
                              )
                            })}
                          </TableCell>
                          <TableCell align="left">{book.publishYear}</TableCell>
                          <TableCell align="left">{book.total - book.availableNumber}</TableCell>
                          <TableCell align="left">{book.total}</TableCell>
                          <TableCell align="left">{book.numberStar?.$numberDecimal}/5</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                    >

                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={bookList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookManager;