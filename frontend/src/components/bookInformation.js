import Header from './header';
import Footer from './footer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import styles from '../screens/CSS/home.module.css';
import stylesBook from '../components/CSS/BookInformation.module.css';
import imageTest from '../assets/testproduct.jpg'
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import UserRating from './ReaderRating';

function BookInformation({navigation}) {
    return (
      <div className={styles.Home}>
        <Header navigation={navigation}/>
        <div className={styles.content} >
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Thong tin san pham </p>
            <div className={stylesBook.productImage}>
              <div className="image">
                <Card sx={{ maxWidth: 345, minWidth: 300 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={imageTest}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              </div>
              <div className={stylesBook.productTitle}>
                  <h2> Rubik GAN Monster GO 2x2 / 3x3 / Pyraminx / Skewb Stickerless - Monster GO 3x3 M Có Nam Châm </h2>
                  <div  className={stylesBook.soldInfo}>               
                    <h3>3</h3>
                    <div className={stylesBook.ratingInfo}>                  
                      <Rating name="half-rating-read" defaultValue={3} readOnly />
                    </div>       
                    <div className={stylesBook.tap}>
                      <h3> | 123 Đánh giá </h3>  
                    </div>              
                  </div>

                  <div className={stylesBook.colInformation}>
                    <div className={stylesBook.colInformation_2}>
                      <h3> Gui tu </h3>  
                    </div>
                    <div>
                      <h3> Ha Noi </h3>  
                    </div>      
                  </div>

                  <div className={stylesBook.colInformation}>
                    <div className={stylesBook.colInformation_2}>
                      <h3> Tong so sach </h3>  
                    </div>
                    <div>
                      <h3> 10 </h3>  
                    </div>      
                  </div>

                  <div className={stylesBook.colInformation}>
                    <div className={stylesBook.colInformation_2}>
                      <h3> TInh trinh </h3>  
                    </div>
                    <div>
                      <h3> co the muon </h3>  
                    </div>      
                  </div>

                  <div className={stylesBook.colInformation}>
                    <div className={stylesBook.colInformation_2}>
                      <h3> tac gia </h3>  
                    </div>
                    <div>
                      <h3> DTV </h3>  
                    </div>      
                  </div>

                  <div className={stylesBook.colInformation}>
                    <div className={stylesBook.colInformation_2}>
                      <h3> Cap nhat </h3>  
                    </div>
                    <div>
                      <h3> 21:30:14 21/05/2022 </h3>  
                    </div>      
                  </div>
                  <p className={styles.tdisplay}> </p>

              </div>
            </div>
            <div className={stylesBook.footFake}>
              <p>  </p>
            </div>
          </div>

          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Chi Tiet san pham </p>
            <div className={stylesBook.colInformation}>
              <div className={stylesBook.colInformation_1}>
                Loai san pham
              </div>
              <div>
                Mo Hinh
              </div>
            </div>

            <div className={stylesBook.colInformation}>
              <div className={stylesBook.colInformation_1}>
                Kho hang
              </div>
              <div>
                10
              </div>
            </div>

            <div className={stylesBook.colInformation}>
              <div className={stylesBook.colInformation_1}>
                Gui tu
              </div>
              <div>
                Ha Noi
              </div>
            </div>

            <div className={stylesBook.colInformation}>
              <div className={stylesBook.colInformation_1}>
                Mo ta san pham
              </div>
              <div>
                <div>Mô Hình Nendoroid Nino Nakano - Nendoroid 1612 Gotoubun No Hanayome</div>
                <div>Có thể thay đổi tay chân, khuôn mặt như trong ảnh</div>
                <div>- Kích thước: 10cm</div>
                <div>- Công ty sản xuất: GSC</div>
              </div>
            </div>

          </div>
          <div className={styles.wraper}>
            <p className={styles.tdisplay}> Danh gia san pham </p>
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
              comment="San pham dep"
            />

            <UserRating
              imageTest={imageTest}
              userName="Ayano"
              ratingScore={4}
              timeRate="14:30:00 29/04/2022"
              comment="San pham tot"
            />

            <UserRating
              imageTest={imageTest}
              userName="Mitsuha"
              ratingScore={4}
              timeRate="14:30:00 05/05/2022"
              comment="Nino is the best"
            />

          </div>
        </div>
        <Footer navigation={navigation}/>
      </div>
    );
  }
  
  export default BookInformation;