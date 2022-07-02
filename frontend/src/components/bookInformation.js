import Header from './header';
import Footer from './footer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea } from '@mui/material';
import styles from '../screens/CSS/home.module.css';
import stylesBook from '../components/CSS/BookInformation.module.css';
import imageTest from '../assets/testproduct.jpg'
import { Rating } from '@mui/material';
import UserRating from './ReaderRating';
import logo from '../assets/logo.png'
import face from '../assets/facebook.png'
import instagram from '../assets/instagram.png'
import twitter from '../assets/twitter.png'
import BookImages from './bookImages';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState, useRef, memo } from 'react';
import BookAPI from '../api/BookAPI';

function BookInformation({navigation}) {
    const navigate = useNavigate();
    const [bookInfo, setBookInfo] = useState([])

    const navigatePath = function (path) {
      if (window.location.pathname !== path) {
        navigate(path);
      }
    };
    function getData(){
      BookAPI.getBookById().then((res) => {
        console.log(res.data)
        let bookInfoRes = res.data;
        setBookInfo(bookInfoRes.data)
      
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
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Thông tin sách </p>
            <div className={stylesBook.productImage}>
              <div className="image">
                <BookImages images={[face, instagram, twitter, imageTest]} />
              </div>
              <div className={stylesBook.information}>
                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>
                    Tên sách:
                  </div>
                  <div>
                   Sống là để yêu thương
                  </div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>
                    Thể loại:
                  </div>
                  <div>
                    Rom-Com
                  </div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>
                    Đánh giá:
                  </div>
                  <div  className={stylesBook.rating}>               
                    <p>3</p>
                    <div className={stylesBook.star}>                  
                      <Rating name="half-rating-read" defaultValue={3} readOnly />     
                    </div>      
                  </div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>
                    Lượt đánh giá:
                  </div>
                  <div>
                    123 Đánh giá
                  </div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>
                    Tên tác giả:
                  </div>
                  <div>
                    Bạn Vũ giấu tên
                  </div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>
                    Năm xuất bản:
                  </div>
                  <div>
                    2022
                  </div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>
                    Tình trạng:
                  </div>
                  <div>
                    Có thể mượn
                  </div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>
                    Cập nhật lần cuối:
                  </div>
                  <div>
                    15:30:00 15/06/2022
                  </div>
                </div>
                <p className={styles.tdisplay}> </p>

                <div>
                  <Button> Thêm vào danh sách mượn </Button>
                  <Button onClick={() => {navigatePath("/cartBook")}}> Mượn ngay </Button>
                </div>
                <div className={stylesBook.footFake}>
                  <p>  </p>
                </div>

              </div>
            <div className={stylesBook.footFake}>
              <p>  </p>
            </div>
          </div>
          </div>          
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Nội dung </p>
            <div className={stylesBook.information}>
              Tên khác: My stepmom's daughter was my ex-girlfriend; La hija de mi madrastra es mi ex-novia,Mamahaha no tsurego ga moto kanodatta,Mamakano
              Cái tên nói lên tất cả.
            </div>
            <div className={stylesBook.footFake}>
              <p>  </p>
            </div>
          </div>
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Đánh giá sách </p>
            <div className={stylesBook.colInformation}> 
              <div>    
                <h3 className={stylesBook.ratingScore}> 3 / 5 </h3>
                <div className={stylesBook.ratingInfo}>                  
                  <Rating name="half-rating-read" defaultValue={3} readOnly />
                </div>
              </div>  
              <div>
                <h3  className={stylesBook.ratingScore}> 123 Đánh giá  </h3>  
              </div>      
            </div>
            
            <UserRating
              imageTest={imageTest}
              userName="Kito"
              ratingScore={5}
              timeRate="14:30:00 29/05/2022"
              comment="Sách khá hay"
            />

            <UserRating
              imageTest={imageTest}
              userName="Ayano"
              ratingScore={4}
              timeRate="14:30:00 29/04/2022"
              comment="Sách không tệ lắm"
            />

            <UserRating
              imageTest={imageTest}
              userName="Mitsuha"
              ratingScore={4}
              timeRate="14:30:00 05/05/2022"
              comment="Bao giờ có tập mới vậy?"
            />

          </div>
        </div>
        <Footer navigation={navigation}/>
      </div>
    );
  }
  
  export default BookInformation;