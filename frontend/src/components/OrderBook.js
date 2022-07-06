import React, { useEffect, useState, useRef, memo } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/orderBook.module.css';
import InformationTab from './InfomationTab';
import OrderBookItem from './OrderBookItem';
import BorrowBookAPI from '../api/BorrowBookAPI';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function OrderBook({ navigation }) {
  const [books, setBooks] = useState([]);
  const [success, setSuccess] = useState(false);
  
  function getData() {
    BorrowBookAPI.searchAdmin({ typeBorrowBook: "await" }).then((res) => {
      console.log(res.data.data);
      setBooks(res.data.data)
    })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData();
  }, [success]);
  return (
    <div className={styles.Home}>
      <Header navigation={navigation} />
      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Đã thêm thành công
        </Alert>
      </Snackbar>
      <div className={styles.content} >
        <div className={styles.tab1} >
          <InformationTab />
        </div>

        <div className={styles.tab2} >
          {
            books?.map((book) => {
              return (
                <OrderBookItem books={book} setSuccess={setSuccess} />
              )
            })
          }
        </div>
      </div>
      <Footer navigation={navigation} />

    </div>
  );
}

export default OrderBook;