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
import bookimg from '../assets/angle.jpg';


function BookCardCart({book}) {
  return (
    <Link
      className={clsx(styles.cardContainer)}
      to={
        `/book/${book._id}`
      }
    >
      <Card className={clsx(styles.cardBody)} sx={{ maxWidth: 200, minWidth: 200 }}>
        <div className={clsx(styles.productImage)}>
          <CardMedia
            // className={clsx(styles.productImage)}
            component="img"
            height="60"
            image={book.images[0]}
            alt={book.title}
          />
        </div>
        <div className={clsx(styles.cardContent)}>
          <div className={clsx(styles.cardHeader)}>
            <p className={clsx(styles.cardTitle)}>{book.title}</p>
          </div>

          <div className={clsx(styles.productContent)}>
            <div className={clsx(styles.productRating)}>
              <Rating
                name="half-rating-read"
                className={clsx(styles.rating)}
                value={Number(book.numberStar.$numberDecimal)}
                precision={0.1}
                readOnly
              />
              <span className={clsx(styles.selledNumber)}>
                Năm: {book.publishYear}
              </span>
            </div>
            <span className={clsx(styles.location)}>
              <StoreIcon className={clsx(styles.locationIcon)} />
              {`còn ${book.availableNumber} sách`}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
export default BookCardCart;
