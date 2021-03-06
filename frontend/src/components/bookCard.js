import React, { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/axios';
import clsx from 'clsx';
import styles from './CSS/ProductCardCSS.module.scss';
import Card from '@mui/material/Card';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StoreIcon from '@mui/icons-material/Store';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import noImage from '../assets/noImage.png';

function BookCard({ book }) {
  // const [productInfo, setProductInfo] = useState({
  //   name: book.name,
  //   rate: book.re,
  //   count: 100,
  //   image:
  //     'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png',
  // });
  return (
    <Link
      className={clsx(styles.cardContainer)}
      to={
        `/book/${book._id}`
      }
    >
      <Card className={clsx(styles.cardBody)} sx={{ maxWidth: 200, minWidth: 200 }}>
        <div className={clsx(styles.productImage)}>
          {book.images ?
            <CardMedia
              // className={clsx(styles.productImage)}
              component="img"
              height="60"
              image={book.images}
              alt={book.title}
            /> : <img src={noImage} alt="anh" style={{height:"60"}} className="img"/>
        }
        </div>
        <div className={clsx(styles.cardContent)}>
          <div className={clsx(styles.cardHeader)}>
            <p className={clsx(styles.cardTitle)}>{book.title}</p>
            {/* <strong
              className={clsx(styles.cardPrice)}
            >{`${productInfo.price} đ`}</strong> */}
          </div>

          <div className={clsx(styles.productContent)}>
            <div className={clsx(styles.productRating)}>
              <Rating
                name="half-rating-read"
                className={clsx(styles.rating)}
                value={book.numberStar?.$numberDecimal}
                precision={0.1}
                readOnly
              />
              <span className={clsx(styles.selledNumber)}>
                Năm: {book.publishYear}
              </span>
            </div>
            <span className={clsx(styles.location)}>
              <StoreIcon className={clsx(styles.locationIcon)} />
              {'còn ' + book.availableNumber + ' sách'}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
export default BookCard;
