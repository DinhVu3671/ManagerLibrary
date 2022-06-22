import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CSS/FooterCSS.module.css';
import logo from '../assets/logo.png';
import face from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import twitter from '../assets/twitter.png'

function Footer() {
  const navigate = useNavigate();
  const navigatePath = function (path) {
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <div className={styles.Header}>
      <div className={styles.toolBar}>
        <img
          src={logo}
          className={styles.logo}
          alt="search"
          onClick={() => navigatePath('/')}
        />
        <div className={styles.title}>
          <h3> THƯ VIỆN ĐTV - TRƯỜNG ĐẠI HỌC BÁCH KHOA HÀ NỘI </h3>
          <div>
            <p> Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội </p>   
            <p> Điện thoại: (84-24) 3869 2243 </p> 
            <p>  Email: tvdtv@hust.edu.vn </p>          
          </div>
    
        </div>

        <div>
          <h3> Mạng xã hội </h3>
          <div  className={styles.link}>
            <img
              src={face}
              className={styles.image2}
              alt="search"
              onClick={() => navigatePath('/')}
            />
            <img
              src={instagram}
              className={styles.image2}
              alt="search"
              onClick={() => navigatePath('/')}
            />
            <img
              src={twitter}
              className={styles.image2}
              alt="search"
              onClick={() => navigatePath('/')}
            />            
          </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;
