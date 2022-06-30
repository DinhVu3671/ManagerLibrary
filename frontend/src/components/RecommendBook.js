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
function RecommendBook(){
  const navigate = useNavigate();

  const navigatePath = function (path) {
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8 }}  style={{padding:'5px'}}>
              {Array.from(Array(8)).map((_, index) => (
                <Grid item xs={2} sm={1} md={1} key={index}>
                  <Card sx={{ maxWidth: 345,height:200 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="60"
                        image={bookimg}
                        alt="green iguana"
                        onClick={() => {navigatePath("/book")}}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>

    )
}

export default RecommendBook;