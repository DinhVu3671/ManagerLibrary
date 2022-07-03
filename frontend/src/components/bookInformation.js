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
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef, memo} from 'react';
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
        console.log(res.data.data);
        setComment(res.data.data)
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
                  <div>{bookInfo.title}</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>Thể loại:</div>
                  <div>{bookInfo.categories? (bookInfo.categories)[0].name : null}</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>Đánh giá:</div>
                  <div  className={stylesBook.rating}>               
                    <p>{rating?.numberStar}</p>
                    <div className={stylesBook.star}>                  
                      <Rating name="half-rating-read" defaultValue={rating?.numberStar} readOnly />     
                    </div>      
                  </div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>Lượt đánh giá:</div>
                  <div>{rating?.numberRate} Đánh giá</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>Tên tác giả:</div>
                  <div>{bookInfo?.author}</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>Năm xuất bản:</div>
                  <div>{bookInfo?.publishYear}</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>Tình trạng:</div>
                  <div>{bookInfo?.status == 'Available' ? "Có thể mượn" : "Đã cho mượn hết"}</div>
                </div>

                <div className={stylesBook.title}>
                  <div className={stylesBook.content}>Cập nhật lần cuối:</div>
                  <div>{bookInfo?.updatedAt}</div>
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
              {bookInfo?.description}
            </div>
            <div className={stylesBook.footFake}>
              <p>  </p>
            </div>
          </div>
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Đánh giá sách </p>
            <div className={stylesBook.colInformation}> 
              <div>    
                <h3 className={stylesBook.ratingScore}> {rating?.numberStar} / 5 </h3>
                <div className={stylesBook.ratingInfo}>                  
                  <Rating name="half-rating-read" defaultValue={rating?.numberStar} readOnly />
                </div>
              </div>  
              <div>
                <h3  className={stylesBook.ratingScore}> {rating?.numberRate} Đánh giá  </h3>  
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