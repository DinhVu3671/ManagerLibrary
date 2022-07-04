import React, { useEffect, useState, useRef, memo } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/orderBook.module.css';
import InformationTab from './InfomationTab';
import OrderHistoryItem from './OrderHistotyItem';
import BorrowBookAPI from '../api/BorrowBookAPI';

function ReturnBook({navigation}) {
  const [books, setBooks] = useState([]);
  function getData() {
    BorrowBookAPI.searchAdmin({typeBorrowBook: "refurn"}).then((res) => {
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
                books?.map((item) => {
                  return (
                    <OrderHistoryItem returnee={true} book={item} />  
                  )
                })
              }      
            </div>
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default ReturnBook;