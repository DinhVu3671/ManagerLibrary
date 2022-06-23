import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import stylesBook from '../components/CSS/BookInformation.module.css';
import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';

function ReaderRating({imageTest, userName, ratingScore, timeRate, comment}){
    return(
        <div className={stylesBook.productImage}>
        <div className="image">
          <Card sx={{ maxWidth: 45, maxHeight: 45, marginTop : 0.5, marginBottom : 0.5}}>
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
          <Link to='/testShop' >
            <h4>
              {userName}
            </h4>
          </Link>
          <div className={stylesBook.ratingUser}>                  
            <Rating name="half-rating-read" defaultValue={ratingScore} readOnly size="small" />
          </div>
          <div className={stylesBook.ratingUser}>                  
            <h5>{timeRate}</h5>
          </div>
          <div className={stylesBook.ratingUser}>                  
            <p>{comment}</p>
          </div>

        </div>
      </div>
    )
}

export default ReaderRating;