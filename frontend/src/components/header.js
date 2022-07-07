import React from "react";
import searchImage from '../assets/magnifier.png'
import userImage from '../assets/user1.png'
import logo from '../assets/logo.png'
import styles from './CSS/HeaderCSS.module.css'
import Cookies from "js-cookie";
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import BookAPI from "../api/BookAPI";
import BookIcon from '@mui/icons-material/Book';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CategoriesAPI from "../api/CategoriesAPI";
import { Grid } from "@mui/material";
import BookCardHome from "./bookCardHome";
import BookCardCart from "./bookCardCart";
import Badge from '@mui/material/Badge';
// import { AuthContext } from '../contextAPI/AuthContext';

function Header() {
  const navigate = useNavigate();
  // const {
  //   AuthDispatch,
  //   AuthState: { fullName, role, token }
  // } = useContext(AuthContext);
  const dictDay = {
    0: 'Chủ nhật',
    1: 'Thứ Hai',
    2: 'Thứ Ba',
    3: 'Thứ Tư',
    4: 'Thứ Năm',
    5: 'Thứ Sáu',
    6: 'Thứ Bảy',
  };
  let date = new Date();
  const dateCurr = date.toLocaleDateString();
  const dayCurr = dictDay[date.getDay()];

  const listTopic = [
    ['TRANG CHỦ', ''],
    ['TÌM KIẾM', 'search'],
    ['GIỚI THIỆU', ''],
  ];

  const [username, setUsername] = useState('');
  const [bookList, setBooks] = useState([]);

  function getData() {
    BookAPI.listBook().then((res) => {
      let bookListRes = res.data;
      setBooks(bookListRes.data);
    })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData();
  }, []);

  const navigatePath = function (path) {
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };

  const [keyword, setKeyword] = React.useState('');

  const handleChange = (e) => {
    setKeyword(e.target.value);
    console.log(keyword)
  };

  const listKeyWord = ['Nhan đề', 'Tác giả', 'Chủ đề', 'Mô tả']

  // profile
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElCart, setAnchorElCart] = useState(null);
  const [openCart, setOpenCart] = useState(false)

  const open = Boolean(anchorEl);
  const handleClickProfile = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClickCart = (e) => {
    setAnchorElCart(e.currentTarget);
    setOpenCart(true);
    navigatePath('/cartBook');
  };

  const handleCloseBookManager = () => {
    setAnchorEl(null);
    navigatePath('/bookManager');
  };
  const handleCloseProfile = () => {
    setAnchorEl(null);
    navigatePath('/account');
  }
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    navigatePath('/login');
  };

  const handleBookReaderManager = () => {
    setAnchorEl(null);
    navigatePath('/bookReaderManager');
  };

  const handleUser = () => {
    setAnchorEl(null);
    navigatePath('/readerManager');
  };

  //testdata
  const [featuredBook, setFeatureBook] = useState([]);
  const [categories, setCategory] = useState([]);
  const [numberCart, setNumberCart] = useState(0);

  function getData() {
    CategoriesAPI.getCategories().then((res) => {
      setCategory(res.data.data)
    })
      .catch(err => {
        console.log(err)
      });
    BookAPI.outstandingBook().then((res) => {
      setFeatureBook(res.data.data)
    })
      .catch(err => {
        console.log(err)
      });

      let cart = JSON.parse(sessionStorage.getItem("listBook"));
      if(cart) {
        setNumberCart(cart.length);
      }
  }
  useEffect(() => {
    getData();
  }, []);


  return (
    <div className={styles.Header}>
      <div className={styles.toolBar}>
        <img
          src={logo}
          className={styles.logo}
          alt="search"
          onClick={() => navigatePath('/')}
        />
        <div className={styles.title}>
          <h3> TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI </h3>
          <h3> THƯ VIỆN ĐTV </h3>
        </div>

        <div>
          <ul className={`${styles.textColor} ${styles.narMenu}`}>
            {listTopic.map((topic) => (
              <Link className={styles.narItem} to={`/${topic[1]}`}>{topic[0]}</Link>
            ))}
          </ul>
        </div>

        <div>
          <label
            className={`${styles.textColor} ${styles.textDate}`}
          >{`${dayCurr}, ${dateCurr}`}</label>
          <div style={{ display: "flex", marginTop: "10px" }}>
            {
              localStorage.getItem('token') ? ((localStorage.getItem('role') === "admin") ? null :
                <Badge badgeContent={numberCart} color="primary">
                  <MenuBookIcon onClick={handleClickCart} fontSize="medium" sx={{ color: "white" }}> </MenuBookIcon>
                </Badge>
              ) : null
            }

            <div className={styles.divUser} style={{marginLeft: "16px"}}
              onClick={() =>
                (localStorage.getItem('token')) == null
                  ? navigatePath('/login')
                  : null
              }>
              <img
                src={userImage}
                className={styles.userIcon}
                onClick={handleClickProfile}
                alt="Profile"
              />
              <div className={styles.textColor}>
                {(localStorage.getItem('token')) == null ? 'Đăng nhập' : (localStorage.getItem('fullName'))}
              </div>
            </div>


          </div>

          {
            ((localStorage.getItem('token')) != null) ? (((localStorage.getItem('role')) === "admin") ?
              null :
              <Menu
                id="basic-menu"
                open={openCart}
                onClose={() => setOpenCart(false)}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {featuredBook?.map((book, index) => (
                  <MenuItem>
                    <BookCardCart book={book} />
                  </MenuItem>

                ))}
                <Button style={{ marginLeft: '20px' }} variant="outlined"> Đăng kí mượn </Button>
              </Menu>) : null
          }


          {
            ((localStorage.getItem('token')) != null) ? (((localStorage.getItem('role')) === "admin") ?
              <Menu
                // id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                // MenuListProps={{
                //   'aria-labelledby': 'basic-button',
                // }}
              >
                <MenuItem onClick={handleCloseBookManager}> Quản lý </MenuItem>
                {/* <MenuItem onClick={handleUser}> Quản lý tài khoản người dùng</MenuItem> */}
                <MenuItem onClick={handleLogout}> Đăng xuất </MenuItem>
              </Menu> :
              <Menu
                // id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                // MenuListProps={{
                //   'aria-labelledby': 'basic-button',
                // }}
              >
                <MenuItem onClick={handleCloseProfile}> Tài khoản của tôi </MenuItem>
                <MenuItem onClick={handleBookReaderManager}> Quản lý mượn trả </MenuItem>
                <MenuItem onClick={handleLogout}> Đăng xuất </MenuItem>
              </Menu>) : null
          }

        </div>
      </div>

      {/* <div className={styles.cmp_2}>
        <Box sx={{ minWidth: 120 }} className={styles.select}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Từ khoá</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={keyword}
              label="keyword"
              onChange={handleChange}
              className={styles.box}
            >
              {listKeyWord.map((keyword, index) => (
                <MenuItem value={`${index}`}>{`${keyword}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <div className={styles.divSearch}>
          <input
            type="text"
            placeholder="Nhập nội dung..."
            className={styles.search}
          />
          <img
            src={searchImage}
            className={styles.image}
            alt="search"
            onClick={() => navigatePath('/tim-kiem')}
          />
        </div>
      </div> */}
    </div>
  );
}

export default Header;
