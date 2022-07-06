import React from 'react';
import clsx from 'clsx';
import styles from './CSS/searchCSS.module.scss';
import { useEffect, useState, useRef } from 'react';
import axios from '../config/axios';
import Header from './header';
import BookCard from './bookCard';

import Rating from '@mui/material/Rating';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import SearchBar from 'material-ui-search-bar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defaultImage = 'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png'

function Search() {

  //console.log(search);
  const allRating = useRef([5, 4, 3, 2, 1]);
  const allSort = useRef([
    {
      value: 'most',
      showed: 'Còn nhiều',
    },
    {
      value: 'rating',
      showed: 'Đánh giá',
    },
    {
      value: 'newest',
      showed: 'Mới nhất',
    },
  ]);

  const handleSort = (book1, book2) => {
      if(sort === 'most'){
        if(book1.count > book2.count)
          return -1
        else
          return 1
      }
      else if(sort === 'rating'){
        if(book1.rate > book2.rate)
          return -1
        else
          return 1
      }
      else if(sort === 'newest'){
        if(book1.year > book2.year)
          return -1
        else
          return 1
      } 
      else 
        return 1
  }


  //for all data -request once time when component
  const [allCategories, setAllCategories] = useState([]);

  const [showedCategories, setShowedCategories] = useState([]);
  const [bookList, setBooks] = useState([]);
  const [data, setData] = useState([]);

  function getData(){
    BookAPI.listBook().then((res) => {
      let bookListRes = res.data;
      console.log(bookListRes);
      setBooks(bookListRes.data);
      setData(bookListRes.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
      getData(); 
  }, []);

  const [numPages, setNumPages] = useState(0);

  //for changing Filter
  const [categories, setCategories] = useState([]);
  const [apply, setApply] = useState(false);
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('most');
  const [loading, setLoading] = useState(true);

  //Categories
  const handleCategories = (category) => {
    setCategories((prev) => {
      const isChecked = categories.includes(category);
      if (isChecked) {
        return categories.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  function handleSeeLessCategories() {
    const len = allCategories.length;
    setShowedCategories(allCategories.slice(0, 5));
    const checkedUnshowed = allCategories
      .slice(5, len)
      .filter((item) => categories.find((category) => category === item));
    //console.log(checkedUnshowed);
    if (checkedUnshowed.length !== 0) {
      for (const category of checkedUnshowed) {
        //console.log(category);
        setCategories(categories.filter((item) => item !== category));
      }
    }
  }

  const handlePageChange = (event, value) => {
    //console.log('Page: ', value);
    setPage(value);
  };

  function handleClearAll() {
    setCategories([]);
    // setLocations([]);
    // setBrands([]);
    setRating(0);
    setApply(false);
    setSort('none');
  }
  const testData = [
    {name: "em gái mẹ kế là người yêu cũ của tôi", rate: 4.6, count: 100, year: 2020, image: defaultImage},
    {name: "Kết hôn với người ghét nhất", rate: 4.3, count: 120, year: 2020, image: defaultImage},
    {name: "Tình yêu giả tạo", rate: 2.1, count: 180, year: 2021, image: defaultImage},
    {name: "Giải cứu bạn thuở nhỏ", rate: 0.5, count: 1130, year: 2024, image: defaultImage},
    {name: "Cạo râu xong, tôi nhặt gái cao trung về", rate: 1.2, count: 110, year: 2019, image: defaultImage},
    {name: "Bạn gái lại có thêm bạn gái", rate: 3.8, count: 140, year: 2018, image: defaultImage},
    {name: "Thám tử đã chết", rate: 1.1, count: 170, year: 2010, image: defaultImage},

  ];
  
  //data and request data
  // const [productIdList, setProductIdList] = useState(testData);
  const [shopId, setShopId] = useState('');
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = testData.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };


  return (
    <div className={clsx(styles.search)}>
      <Header />
      <div className={clsx(styles.searchContainer)}>
        <div className={clsx(styles.searchSidebar)}>
          <h2 className={clsx(styles.sidebarTitle)}>
            {' '}
            <FilterAltIcon /> Bộ lọc tìm kiếm
          </h2>
          <div className={clsx(styles.searchFilter)}>
            <h3>Theo Danh Mục</h3>
            <div>
              {showedCategories.map((category, index) => (
                <div key={index} className={clsx(styles.rowFilter)}>
                  <input
                    className={clsx(styles.checkBox)}
                    type="checkbox"
                    id={`checkbox${category}`}
                    value={category}
                    checked={categories.includes(category)}
                    onChange={() => {
                      handleCategories(category);
                    }}
                  />
                  <label
                    className={clsx(styles.checkBoxLabel)}
                    htmlFor={`checkbox${category}`}
                  >
                    {category}
                  </label>
                </div>
              ))}

              {allCategories.length > 5 && (
                <div className={clsx(styles.rowFilter)}>
                  {showedCategories.length === 5 && (
                    <span
                      className={clsx(styles.viewMore)}
                      onClick={() => setShowedCategories(allCategories)}
                    >
                      <ExpandMoreIcon /> Xem thêm{' '}
                    </span>
                  )}
                  {showedCategories.length > 5 && (
                    <span
                      className={clsx(styles.viewMore)}
                      onClick={handleSeeLessCategories}
                    >
                      <ExpandLessIcon /> Thu gọn{' '}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className={clsx(styles.searchFilter)}>
            <h3>Đánh giá</h3>
            <div>
              {allRating.current.map((rate) => (
                <div key={rate} className={clsx(styles.rowFilter)}>
                  <input
                    id={`radio${rate}`}
                    className={clsx(styles.inputRadio)}
                    type="radio"
                    value={rate}
                    checked={rating === rate}
                    onChange={() => {
                      setRating(rate);
                    }}
                  />
                  <label
                    className={clsx(styles.radioLabel)}
                    htmlFor={`radio${rate}`}
                  >
                    <Rating
                      className={clsx(styles.rating)}
                      value={rate}
                      div
                      disabled
                    />
                    {rate === 5 || <span> trở lên</span>}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <Button
            className={clsx(styles.button)}
            variant="contained"
            onClick={handleClearAll}
          >
            Xóa tất cả
          </Button>
        </div>
        <div className={clsx(styles.searchBody)}>
          <div>
              <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                placeholder="Tìm tên sách . . ."
              />
            <div className={clsx(styles.productContent)}>
              <div className={clsx(styles.productSort)}>
                <span className={clsx(styles.productSortTitle)}>
                  Sắp xếp theo{' '}
                </span>
                <div className={clsx(styles.productSortNav)}>
                  {allSort.current.map((item) => (
                    <div
                      key={item.value}
                      className={clsx(styles.productSortItem)}
                    >
                      <button
                        className={clsx(
                          styles.productSortBtn,
                          sort === item.value && styles.selectedItem
                        )}
                        onClick={() => setSort(item.value)}
                      >
                        {item.showed}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {data?.length === 0 ? (
                <div className={clsx(styles.productContainer)}>
                  Không tìm thấy kết quả nào
                </div>
              ) : (
                <div className={clsx(styles.productContainer)}>
                  {data?.sort(handleSort).filter((book) => book.rate >= rating).map((value, index) => (
                    <Grid item xs={1} sm={1} md={1} key={index}>
                      <BookCard book={value} />
                    </Grid>
                  ))}
                </div>
              )}
              {numPages > 1 && (
                <div className={clsx(styles.pagination)}>
                  <Stack spacing={2}>
                    <Pagination
                      count={numPages}
                      page={page}
                      variant="outlined"
                      shape="rounded"
                      color="primary"
                      onChange={handlePageChange}
                    />
                  </Stack>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;