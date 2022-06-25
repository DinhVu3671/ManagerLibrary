import styleBookReader from '../components/CSS/BookReaderItem.module.css'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import styles from '../components/CSS/BookInformation.module.css';
import imageTest from '../assets/testproduct.jpg'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import clsx from 'clsx';

function ButtonOrder({post, st}){
    console.log(st)
    return (
        <div >
            {st === "Đã trả" && (
                <div className={clsx(styleBookReader.soldInfo, styleBookReader.button2)}>          
                    <div className={clsx(styleBookReader.tap)}>
                        <Button variant="outlined"> Đánh giá sách </Button>
                    </div> 
                    <div>
                        <Button variant="outlined" > Mượn lại </Button>
                    </div>
                    
                </div>
            )}
        </div>
      );

}

function BookReaderItem({book, idShow}){
    const posts = [
        {status: "Đang mượn", button1: "", button2: ""},
        {status: "Đã trả", button1: "Mượn lại", button2: "Đánh giá sách"},
      ];
    return(
        <div className={styleBookReader.Home}>
            <div className={styleBookReader.content} >
                <div className={styleBookReader.wraper}>
                    <div className={styleBookReader.tdisplay}>  
                        { (idShow === 0 && <h3 className={styleBookReader.statusTitle}> {book.status} </h3> ) ||                         
                            <p>  </p>
                        }
                    </div>
                    <div className={styleBookReader.productImage}>
                        <Link to="/ProductTest">
                            <div className="image">
                                <Card sx={{ maxWidth: 100, minWidth: 100 }}>
                                    <CardActionArea>
                                        <CardMedia
                                        component="img"
                                        image={imageTest}
                                        alt="green iguana"
                                        />
                                    </CardActionArea>
                                </Card>
                            </div>                        
                        </Link>
                        
                        <div className={styleBookReader.productTitle}>
                            <p> Tên sách: {book.title} </p>
                            <p className={styleBookReader.item}> Thể loại: {book.type} </p>
                            <p className={styleBookReader.item}> Tác giả: {book.writter} </p>
                            <p className={styleBookReader.item}> Năm: {book.year} </p>
                            <p className={styleBookReader.item}> Ngày mượn: {book.date} </p>
                            <p className={styleBookReader.item}> Ngày trả: {book.dateValid} </p>
                        </div>
                        <div className={styleBookReader.footFake}>
                            <p>  </p>
                        </div>
                    </div>
                    <div className={styleBookReader.button}>
                        <ButtonOrder post = {posts} st = {book.status} />                
                    </div>
                    <div className={styles.footFake}>
                            <p>  </p>
                    </div>
                    {book.status === "Đang mượn" &&                    
                        <div className={styles.footFake}>
                                <p>  </p>
                        </div> 
                    }
                </div>
            </div>
        </div>
    );
}

export default BookReaderItem;