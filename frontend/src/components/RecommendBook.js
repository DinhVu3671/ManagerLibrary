import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import bookimg from '../assets/book.jpg';
import BookCard from './bookCard';
import BookCardHome from './bookCardHome';

function RecommendBook({featuredBook}){
  const navigate = useNavigate();

  const navigatePath = function (path) {
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };
    return (
        <Grid container spacing={{ xs: 3, md: 1 }} columns={{ xs: 3, sm: 5, md: 5 }}  style={{padding:'5px'}}>
              {featuredBook?.map((book, index) => (
                <Grid item xs={1} sm={1} ml={4} md={1} key={index}>
                  {/* <Card sx={{ maxWidth: 345,height:200 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="60"
                        image={bookimg}
                        alt="green iguana"
                        onClick={() => {navigatePath(`/book/${book._id}`)}}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          <p>{book.title}</p>
                          <p>{book.publishYear}</p>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card> */}
                   <BookCardHome book={book} />
                </Grid>
              ))}
          </Grid>

    )
}

export default RecommendBook;