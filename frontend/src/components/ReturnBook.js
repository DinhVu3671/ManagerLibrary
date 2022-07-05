import React, { useEffect, useState, useRef, memo } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/orderBook.module.css';
import InformationTab from './InfomationTab';
import OrderHistoryItem from './OrderHistotyItem';
import BorrowBookAPI from '../api/BorrowBookAPI';
import SearchBar from 'material-ui-search-bar';

function ReturnBook({navigation}) {
  const [books, setBooks] = useState([]);
  const [data, setData] = useState([])
  const [searched, setSearched] = useState("");

  function getData() {
    BorrowBookAPI.searchAdmin({typeBorrowBook: "refurn"}).then((res) => {
      console.log(res.data.data);
      setBooks(res.data.data)
      setData(res.data.data)

    })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getData();
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = books?.filter((row) => {
      console.log(row);
      return row?.user?.fullName?.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
            <div className={styles.tab1} >
              <InformationTab/>
            </div>

            <div className={styles.tab2} >
            <SearchBar
              value={searched}
              onChange={(searchVal) => requestSearch(searchVal)}
              onCancelSearch={() => cancelSearch()}
              placeholder="Tìm người dùng . . ."
            />
              {
                data?.map((item) => {
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