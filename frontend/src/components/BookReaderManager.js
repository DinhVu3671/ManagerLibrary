import Header from './header';
import Footer from './footer';
import styles from '../screens/CSS/home.module.css';
import React, { useEffect, useState, useRef, memo } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Tabs, AppBar } from '@mui/material';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import BookReaderItem from './BookReaderItem';
import styleBookReader from '../components/CSS/BookReaderItem.module.css'
import noImage from '../assets/noItem.png'
import { CardContent } from '@mui/material';
import BorrowBookAPI from '../api/BorrowBookAPI';

function TabPanel(props) {
    const { children, value, index, books, ...other } = props;

    const orderId = [
      {id: 1, status:"Đang mượn"},
      {id: 2, status:"Đã trả"},
    ]
    // var bookValid = books?.filter((book) => (value === book.id || value === 0))
    return (
      <div>
        {value === index && (
            books?.length > 0 ? books.map((book) => {
              return(
                <div>
                    <BookReaderItem 
                      book={book}
                      idShow={value}
                    />
                </div>
              )
            }) : <div className={styleBookReader.noProduct}>
                  <Card sx={{ maxWidth: 200 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={noImage}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Không có kết quả
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
        )}
      </div>
    );
  }

function BookReaderManager({navigation}){
  
  // const books = [
  //   {id: 1, status: "Đang mượn", title: "Hige wo soru", writter: "ĐTV", year: 2019, date: "15:30:00 15/5/2022", dateValid: "15:30:00 15/5/2022"},
  //   {id: 2, status: "Đã trả", title: "Hige wo soru", writter: "ĐTV", year: 2019, date: "15:30:00 15/5/2022", dateValid: "15:30:00 15/5/2022"},
  //   {id: 1, status: "Đang mượn", title: "Hige wo soru", writter: "ĐTV", year: 2019, date: "15:30:00 15/5/2022", dateValid: "15:30:00 15/5/2022"}
  // ];
  
  const [value, setValue] = useState(0);
  const [bookBorrows, setBookBorrows] = useState([]);
  const [bookBorrowing, setBookBorrowing] = useState([]);
  const [bookRefurn, setBookRefurn] = useState([]);
  const [bookAwait, setBookAwait] = useState([]);

  function getData(){
    BorrowBookAPI.listByUser(localStorage.getItem('id')).then((res) => {
      let bookListRes = res.data;
      setBookBorrows(bookListRes.data);
      setBookBorrowing(bookListRes.data?.filter(item => item.status == "borrowing"));
      setBookRefurn(bookListRes.data?.filter(item => item.status == "refurn"));
      setBookAwait(bookListRes.data?.filter(item => item.status == "await"))
    })
    .catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
      getData(); 
  }, []);


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <div className={styles.Home}>
            <Header navigation={navigation}/>
            <div className={styles.content} >
                <div className={styles.wraper}>
                    <p className={styles.tdisplay}> Quản lý mượn trả </p>
                    <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
                    >
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          textColor="secondary"
                          indicatorColor="secondary"
                          aria-label="secondary tabs example"
                          orientation="vertical"
                        >
                            <Tab value={0} label="Tất cả"/>
                            <Tab value={1} label="Đang mượn" />
                            <Tab value={2} label="Đã trả"/>
                            <Tab value={3} label="Đang chờ duyệt"/>
                        </Tabs>
                        <TabPanel value={value} index={0} books={bookBorrows}>        
                        </TabPanel>
                        <TabPanel value={value} index={1} books={bookBorrowing}>
                        </TabPanel>
                        <TabPanel value={value} index={2} books={bookRefurn}>
                        </TabPanel>
                        <TabPanel value={value} index={3} books={bookAwait}>
                        </TabPanel>
                </Box> 
                </div>
            </div>
            <Footer navigation={navigation}/>
      </div>
    );
}

export default BookReaderManager;