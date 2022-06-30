import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/orderBook.module.css';
import InformationTab from './InfomationTab';
import OrderHistoryItem from './OrderHistotyItem';
import BorrowBookAPI from '../api/BorrowBookAPI';
import { useState, useEffect } from 'react';

function OrderHistory({navigation}) {
  const [bookBorrowing, setBookBorrowing] = useState([]);
  function getData(){
    BorrowBookAPI.searchAdmin({typeBorrowBook: "borrowing"}).then((res) => {
      console.log(res.data)
      let bookListRes = res.data;
      setBookBorrowing(bookListRes.data)
    
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
      getData(); 
  }, []);
  console.log(bookBorrowing)
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
            <div className={styles.tab1} >
              <InformationTab/>
            </div>

            <div className={styles.tab2} >
              {
                bookBorrowing?.map(item => {
                  return(
                    <OrderHistoryItem returnee={false} book={item}/>
                  )
                })
              }       
            </div>
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default OrderHistory;