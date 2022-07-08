import Header from './header';
import Footer from './footer';
import styles from './CSS/orderBook.module.css';
import InformationTab from './InfomationTab';
import OrderHistoryItem from './OrderHistotyItem';
import BorrowBookAPI from '../api/BorrowBookAPI';
import { useState, useEffect } from 'react';
import SearchBar from 'material-ui-search-bar';

function OrderValid({navigation}) {
  const [bookBorrowing, setBookBorrowing] = useState([]);
  const [data, setData] = useState([])
  const [searched, setSearched] = useState("");

  function getData(){
    BorrowBookAPI.outOfDateBorrowbook().then((res) => {
      let bookListRes = res.data;
      setBookBorrowing(bookListRes.data)
      setData(bookListRes.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
      getData(); 
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = bookBorrowing?.filter((row) => {
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
                data?.map(item => {
                  return(
                    <OrderHistoryItem valid={true} book={item}/>
                  )
                })
              }       
            </div>
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default OrderValid;