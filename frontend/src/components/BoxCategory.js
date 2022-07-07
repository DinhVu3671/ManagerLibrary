import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import categoryImg from '../assets/categoryImg.png';
import noImage from '../assets/noImage.png';

function BoxCategory({categories}){
  console.log(categories)
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 5, md: 5 }}  style={{padding:'5px'}}>
              {categories?.map((category, index) => (
                <Grid item xs={1} sm={1} ml={4} md={1} key={index}>
                  <Card sx={{ maxWidth: 200, minWidth: 200}}
                  // sx={{ maxWidth: 345,height:200 }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="200"
                        image={noImage}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" fontSize={15}>
                          <p>{category.name}</p>
                          <p>Tổng: {category.total} quyển</p>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>

    )
}

export default BoxCategory;