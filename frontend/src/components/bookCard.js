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

function BookCard(props) {
  const [productInfo, setProductInfo] = useState({
    name: 'Em gái mẹ kế là người yêu cũ của tôi',
    rate: 4.6,
    count: 100,
    image:
      'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png',
  });

  return (
    <Link
      className={clsx(styles.cardContainer)}
      to={
        '/book'
      }
    >
      <Card className={clsx(styles.cardBody)}>
        <div className={clsx(styles.productImage)}>
          <CardMedia
            // className={clsx(styles.productImage)}
            component="img"
            image={productInfo.image}
            alt={productInfo.name}
          />
        </div>
        <div className={clsx(styles.cardContent)}>
          <div className={clsx(styles.cardHeader)}>
            <p className={clsx(styles.cardTitle)}>{productInfo.name}</p>
            {/* <strong
              className={clsx(styles.cardPrice)}
            >{`${productInfo.price} đ`}</strong> */}
          </div>

          <div className={clsx(styles.productContent)}>
            <div className={clsx(styles.productRating)}>
              <Rating
                className={clsx(styles.rating)}
                value={props.productId}
                precision={0.1}
                readOnly
              />
              {/* <span className={clsx(styles.selledNumber)}>
                Đã bán: {productInfo.selled}
              </span> */}
            </div>
            <span className={clsx(styles.location)}>
              <StoreIcon className={clsx(styles.locationIcon)} />
              {'còn ' + productInfo.count + ' sách'}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
export default BookCard;
