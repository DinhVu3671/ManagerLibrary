import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/orderBook.module.css';
import InformationTab from './InfomationTab';
import OrderBookItem from './OrderBookItem';

function OrderBook({navigation}) {
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
            <div className={styles.tab1} >
              <InformationTab/>
            </div>

            <div className={styles.tab2} >
              <OrderBookItem/>
              <OrderBookItem/>          
            </div>
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default OrderBook;