import Header from '../components/header';
import Footer from '../components/footer';
import styles from './CSS/home.module.css';
import BoxCategory from '../components/BoxCategory';
import React, { useEffect, useState, useRef, memo } from 'react';
import logo from '../assets/logo.png'
import face from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import twitter from '../assets/twitter.png'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Introduce from './introduce';
import RecommendBook from '../components/RecommendBook';
import clsx from 'clsx';
import CategoriesAPI from '../api/CategoriesAPI';
import BookAPI from '../api/BookAPI';

function Home({navigation}) {

  const [featuredBook, setFeatureBook] = useState([]);
  const [categories, setCategory] = useState([]);

  function getData(){
    CategoriesAPI.getCategories().then((res) => {
      setCategory(res.data.data)
    })
    .catch(err => {
      console.log(err)
    });
    BookAPI.outstandingBook().then((res) => {
      setFeatureBook(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
      getData(); 
  }, []);
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
                <p className={styles.notetext}> Không phục vụ cuối tuần </p>
                <p className={styles.notetext}> Có thể đăng ký mượn online </p>
                <p className={styles.notetext}> Thời gian mượn tối đa 1 tháng </p>
              </div>
            </div>      
   
        </div>


        <div className={styles.content} >
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Sách nổi bật </p>
            <RecommendBook featuredBook={featuredBook}/>
          </div>
        </div>

        <div className={styles.content} >
          <div className={styles.wraper}>
            <p className={styles.tdisplay}>Danh mục</p>
            <BoxCategory categories={categories} />
          </div>
        </div>
        <Footer navigation={navigation}/>
        
      </div>
    );
  }
  
  export default Home;