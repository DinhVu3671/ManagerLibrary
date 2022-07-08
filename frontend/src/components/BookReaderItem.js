import styleBookReader from '../components/CSS/BookReaderItem.module.css'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import styles from '../components/CSS/BookInformation.module.css';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import stylesBookManger from '../components/CSS/bookManager.module.css';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import CommentAPI from '../api/CommentAPI';

function ButtonOrder({post, st}){
    const [value, setValue] = React.useState(0);
    const [comment, setComment] = React.useState('');
    const [openRating, setRating] = useState(false);
    const handleOpen = () =>  {
        setValue(0);
        setRating(true);
        setComment('');
    };
    const handleClose = () =>  setRating(false);
    const handleSubmit = async () => {
        let data = {
            content: comment,
            numberStart: value,
        }
        try {
            setRating(false)
        }
        catch (err) {
            console.log(err);
        }
    }
    // console.log(st)
    return (
        <div >
            {st === "refurn" && (
                <div>
                    <Modal
                        open={openRating}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box  className={styleBookReader.commentBox}>
                            <div className={styles.wraper}>  
                                <p className={stylesBookManger.formdelete}> Đánh giá sách ? </p>
                            </div>
                            <div className={stylesBookManger.formdelete}>
                                <div>
                                    <Rating
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                            setValue(newValue);
                                            }}
                                        />                                    
                                </div>
                                <input
                                id="comment"
                                name="comment"
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className={clsx(stylesBookManger.formInput, stylesBookManger.row)}
                                placeholder="Bình luận..."
                                required
                                />
                                <div className={stylesBookManger.footFake2}>
                                    <p>  </p>
                                </div>                                
                            </div>
                            <div className={stylesBookManger.button}>
                                <Button onClick={handleClose}> Huỷ </Button>
                                <Button onClick={handleSubmit}>Xác nhận</Button>
                            </div>
                        </Box>
                    </Modal>
                    <div className={clsx(styleBookReader.soldInfo, styleBookReader.button2)}>          
                        <div className={clsx(styleBookReader.tap)}>
                            <Button onClick={handleOpen} variant="outlined"> Đánh giá sách </Button>
                        </div> 
                        <div>
                            <Button variant="outlined" > Mượn lại </Button>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
      );

}

function BookReaderItem({book, idShow}){
    const navigate = useNavigate();

    const navigatePath = function (path) {
      if (window.location.pathname !== path) {
        navigate(path);
      }
    };
    // const posts = [
    //     {status: "borrowing", button1: "", button2: ""},
    //     {status: "refurn", button1: "Mượn lại", button2: "Đánh giá sách"},
    //   ];
    return(
        <div className={styleBookReader.Home}>
            <div className={styleBookReader.content} >
                <div className={styleBookReader.wraper}>
                    <div className={styleBookReader.tdisplay}>  
                        { (idShow === 0 && <h3 className={styleBookReader.statusTitle}> {book.status === "borrowing" ? "Đang mượn" : (book.status === "refurn") ? "Đã Trả": "Đang chờ duyệt"} </h3> ) ||                         
                            <p>  </p>
                        }
                    </div>
                    <div className={styleBookReader.productImage}>
                        <div className="image">
                            <Card sx={{ maxWidth: 100, minWidth: 100 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    image={book.book.images}
                                    alt={book.book.title}
                                    onClick={() => {navigatePath(`/book/${book.book._id}`)}}
                                    />
                                </CardActionArea>
                            </Card>
                        </div>                        
    
                        
                        <div className={styleBookReader.productTitle}>
                            <p> Tên sách: {book.book.title} </p>
                            <p className={styleBookReader.item}> Thể loại: {book.book.categories? (book.book.categories)[0].name : null} </p>
                            <p className={styleBookReader.item}> Tác giả: {book.book.author} </p>
                            {/* <p className={styleBookReader.item}> Năm: {book.year} </p> */}
                            <p className={styleBookReader.item}> Ngày mượn: {(new Date(book.borrowDate)).toLocaleString()} </p>
                            <p className={styleBookReader.item}> Ngày trả: {(new Date(book.refundDate)).toLocaleString()} </p>
                        </div>
                        <div className={styleBookReader.footFake}>
                            <p>  </p>
                        </div>
                    </div>
                    <div className={styleBookReader.button}>
                        <ButtonOrder post = {book.book._id} st = {book.status} />                
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