import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/home.module.css';
import BoxCategory from '../components/BoxCategory';


function Home({navigation}) {

    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
          <div className={styles.wraper}>
            <p className={styles.tdisplay}>Danh mục</p>
            <BoxCategory/>
          </div>

           
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default Home;