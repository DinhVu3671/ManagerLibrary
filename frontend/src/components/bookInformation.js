import Header from './header';
import Footer from './footer';
import { Button } from '@mui/material';
import styles from '../screens/CSS/home.module.css';
import stylesBook from '../components/CSS/BookInformation.module.css';
import imageTest from '../assets/testproduct.jpg'
import { Rating } from '@mui/material';
import UserRating from './ReaderRating';
import BookImages from './bookImages';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState} from 'react';
import BookAPI from '../api/BookAPI';
import RatingAPI from '../api/RatingAPI';
import CommentAPI from '../api/CommentAPI';

function BookInformation({navigation}) {
    const navigate = useNavigate();
    const [bookInfo, setBookInfo] = useState([]);
    const [rating, setRating] = useState();
    const [comment, setComment] = useState([]);
    let { idBook } = useParams();

    const navigatePath = function (path) {
      if (window.location.pathname !== path) {
        navigate(path);
      }
    };
    function getData(){
      BookAPI.getBookById(idBook).then((res) => {
        setBookInfo(res.data.data)
      })
      .catch(err => {
        console.log(err)
      });

      RatingAPI.getRatingForBook(idBook).then((res) => {
        setRating(res.data.data)
      })
      .catch(err => {
        console.log(err)
      });

      CommentAPI.getComment(idBook).then((res) => {
        // console.log(res.data.data);
        setComment(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
    useEffect(() => {
        getData(); 
    }, []);
    const handleBorrow = () => {
      let data = [];
      data.push(bookInfo);
      let listBook = JSON.parse(sessionStorage.getItem("listBook"));
      if(!listBook) {
        sessionStorage.setItem("listBook", JSON.stringify(data));
      }
      else {
        let check = false;
          listBook.map((item) => {
              if (item._id == bookInfo._id) {
                  check = true;
              }
          });
          if(!check) {
              listBook.push(bookInfo);
              sessionStorage.setItem("listBook", JSON.stringify(listBook));
          }
      }
    }
    const handleBorrowAplly = () => {
      let data = [];
      data.push(bookInfo);
      let listBook = JSON.parse(sessionStorage.getItem("listBook"));
      if(!listBook) {
        sessionStorage.setItem("listBook", JSON.stringify(data));
      }
      else {
          let check = false;
          listBook.map((item) => {
              if (item._id == bookInfo._id) {
                  check = true;
              }
          });
          if(!check) {
              listBook.push(bookInfo);
              sessionStorage.setItem("listBook", JSON.stringify(listBook));
          }
      }
      navigatePath("/cartBook")
    }
    // console.log(bookInfo)
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Th??ng tin s??ch </p>
            <div className={stylesBook.productImage}>
              <div className="image">
                <BookImages images={[bookInfo.images]} />
              </div>
              <div className={stylesBook.information}>
                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>
                    T??n s??ch:
                  </div>
                  <div>{bookInfo.title}</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>Th??? lo???i:</div>
                  <div>{bookInfo.categories? (bookInfo.categories)[0].name : null}</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>????nh gi??:</div>
                  <div  className={stylesBook.rating}>               
                    <p>{bookInfo.numberStar?.$numberDecimal}</p>
                    <div className={stylesBook.star}>                  
                      <Rating name="half-rating-read" value={Number(bookInfo.numberStar?.$numberDecimal)}
                precision={0.1} readOnly />     
                    </div>      
                  </div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>L?????t ????nh gi??:</div>
                  <div>{bookInfo.numberStar?.$numberDecimal} ????nh gi??</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>T??n t??c gi???:</div>
                  <div>{bookInfo?.author}</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>N??m xu???t b???n:</div>
                  <div>{bookInfo?.publishYear}</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>T??nh tr???ng:</div>
                  <div>{bookInfo?.status === 'Available' ? "C?? th??? m?????n" : "???? cho m?????n h???t"}</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>C???p nh???t l???n cu???i:</div>
                  <div>{(new Date(bookInfo?.updatedAt)).toLocaleString()}</div>
                </div>
                <p className={styles.tdisplay}> </p>

                <div>
                  <Button onClick={handleBorrow}> Th??m v??o danh s??ch m?????n </Button>
                  <Button onClick={handleBorrowAplly}> M?????n ngay </Button>
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
            <p className={styles.tdisplay}> N???i dung </p>
            <div className={stylesBook.information}>
              {bookInfo?.description}
            </div>
            <div className={stylesBook.footFake}>
              <p>  </p>
            </div>
          </div>
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> ????nh gi?? s??ch </p>
            <div className={stylesBook.colInformation}> 
              <div>    
                <h3 className={stylesBook.ratingScore}> {bookInfo.numberStar?.$numberDecimal} / 5 </h3>
                <div className={stylesBook.ratingInfo}>                  
                  <Rating name="half-rating-read" value={Number(bookInfo.numberStar?.$numberDecimal)}
                precision={0.1} readOnly />
                </div>
              </div>  
              <div>
                <h3  className={stylesBook.ratingScore}> {rating?.numberRate} ????nh gi??  </h3>  
              </div>      
            </div>
            {
              comment?.map((item) => {
                return(
                  <UserRating
                  imageTest={imageTest}
                  userName={item.user.fullName}
                  ratingScore={item.numberStart}
                  timeRate={item.updatedAt}
                  comment={item.description}
                />
                )
              })
            }
          </div>
        </div>
        <Footer navigation={navigation}/>
      </div>
    );
  }
  
  export default BookInformation;