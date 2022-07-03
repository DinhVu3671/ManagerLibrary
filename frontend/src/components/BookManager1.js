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

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Search() {
  let { search } = useParams();
  //request data with search term;
  const PRODUCT_SEARCH_URL = `/product/filter`;

  const [error, setError] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setError(false);
  };

  //console.log(search);
  const allRating = useRef([5, 4, 3, 2, 1]);
  const allSort = useRef([
    {
      value: 'most',
      showed: 'Xem nhiều',
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

  //for all data -request once time when component
  const [allCategories, setAllCategories] = useState([]);

  const [showedCategories, setShowedCategories] = useState([]);

  useEffect(() => {
    axios
      .get('/category/get?all=true')
      .then((res) => {
        let allCates = res.data.data.map((item) => item.categoryName);
        allCates = new Set(allCates);
        allCates = [...allCates];
        setAllCategories(allCates);
        setShowedCategories(allCates.slice(0, 5));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [numPages, setNumPages] = useState(0);

  //for changing Filter
  const [categories, setCategories] = useState([]);
  const [apply, setApply] = useState(false);
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('pho bien');
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
    setSort('related');
  }
  const testData = [4, 1, 3, 1, 4, 5, 1, 2, 2, 4, 3, 1, 5];
  //data and request data
  const [productIdList, setProductIdList] = useState(testData);
  const [shopId, setShopId] = useState('');

  return (
    <div className={clsx(styles.search)}>
      <Header />
      <Snackbar
        className={clsx(styles.errorAlert)}
        open={error}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Vui lòng điền khoảng giá phù hợp!
        </Alert>
      </Snackbar>
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
            <span className={clsx(styles.searchedTitle)}>
              <ManageSearchOutlinedIcon className={clsx(styles.searchedIcon)} />{' '}
              Kết quả tìm kiếm liên quan đến '<strong> {search}</strong>'
            </span>
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
              {productIdList.length === 0 ? (
                <div className={clsx(styles.productContainer)}>
                  Không tìm thấy kết quả nào
                </div>
              ) : (
                <div className={clsx(styles.productContainer)}>
                  {productIdList.filter((item) => item >= rating).map((value, index) => (
                    <Grid item xs={1} sm={1} md={1} key={index}>
                      <BookCard productId={value} />
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
