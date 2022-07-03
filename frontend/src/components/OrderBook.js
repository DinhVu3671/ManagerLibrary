import React, { useEffect, useState, useRef, memo } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/orderBook.module.css';
import InformationTab from './InfomationTab';
import OrderBookItem from './OrderBookItem';
import BorrowBookAPI from '../api/BorrowBookAPI';

function OrderBook({navigation}) {
  const [books, setBooks] = useState([]);
  function getData() {
    BorrowBookAPI.searchAdmin({typeBorrowBook: "await"}).then((res) => {
      console.log(res.data.data);
      setBooks(res.data.data)
    })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData();
  }, []);
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
            <div className={styles.tab1} >
              <InformationTab/>
            </div>

            <div className={styles.tab2} >
              {
                books?.map((book) => {
                  return(
                    <OrderBookItem books={book} /> 
                  )
                })
              }
            </div>
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default OrderBook;