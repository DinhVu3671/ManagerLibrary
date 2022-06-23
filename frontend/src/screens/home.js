import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/home.module.css';
import BoxCategory from '../components/BoxCategory';
import MuiImageSlider from 'mui-image-slider';
import logo from '../assets/logo.png'
import face from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import twitter from '../assets/twitter.png'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Introduce from './introduce';
import RecommendBook from '../components/RecommendBook';
import clsx from 'clsx';

function Home({navigation}) {
  const images = [
    logo, instagram, logo, face
  ];
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.start}>
            <div className={styles.introduceLeft} >
              <div className={styles.wraper}>
                  < Introduce />
              </div>            
            </div>  

            <div className={styles.introduceRight} >         
              <div className={clsx(styles.wraper, styles.note)}>
                <p className={styles.tdisplay}> Lưu ý </p>
                <p className={styles.notetext}> Giờ mở cửa: 8h - 21h </p>
                <p className={styles.notetext}> Giờ mượn trả: 10h - 18h </p>
                <p className={styles.notetext}> Giờ mở cửa: 8h - 12h </p>
                <p className={styles.notetext}> Giờ mở cửa: 8h - 12h </p>
              </div>
            </div>      
   
        </div>


        <div className={styles.content} >
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Sách nổi bật </p>
            <RecommendBook/>
          </div>
        </div>

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