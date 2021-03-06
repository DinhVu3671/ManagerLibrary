import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './CSS/accountReader.module.css';
import axios from '../config/axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ImageUploader from './imageUploader';
import Header from './header';
import Footer from './footer';
import imageTest from '../assets/testproduct.jpg'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Tabs } from '@mui/material';
import UsersAPI from '../api/UsersAPI';

function TabInfor(props) {
  const { value, account } = props;
  const [firstName, setFirstName] = useState('Chuyen De');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarImg, setAvatarImg] = useState(imageTest);
  const [errMsg, setErrMsg] = useState('');

  const [open, setOpen] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setErrMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (errMsg === '') {
      let data = {};
      data = {
        gmail: email,
        fullName: firstName,
      };
      try {
        const response = await UsersAPI.editUserInfo(data);
        setSuccess(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response');
          setOpen(true);
        } else {
          setErrMsg('Thay đổi thất bại.');
          console.log(err);
          setOpen(true);
        }
      }
    }
  }


  useEffect(() => {
    if (errMsg !== '') {
      setOpen(true);
    }
  }, [errMsg]);

  return (
    <div>
      {value === 0 &&(
        <div className={clsx(styles.registerContainer, styles.row)}>
          <div
            className={
              errMsg
                ? clsx(styles.snackbar, styles.show)
                : clsx(styles.snackbar, styles.offscreen)
            }
            aria-live="assertive"
          >
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: '100%' }}
              >
                {errMsg}
              </Alert>
            </Snackbar>
          </div>
          <div className={clsx(styles.registerForm)}>
            <form onSubmit={handleSubmit} className={clsx(styles.row)}>
              <div className={clsx(styles.formTitle, styles.row)}>
                <h2 className={clsx(styles.title)}> Đăng ký tài khoản </h2>
              </div>

              <div className={clsx(styles.row, styles.formRow)}>
                <div className={clsx(styles.formLeft)}>
                  <div className={clsx(styles.formRow, styles.row)}>
                    <div className={clsx(styles.formField, styles.col3)}>
                      <label
                        htmlFor="firstName"
                        className={clsx(styles.formLabel, styles.row)}
                      >
                        Họ và tên:
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        value={account?.fullName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="Họ và tên..."
                        required
                      />
                    </div>

                    <div className={clsx(styles.formField, styles.col3)}>
                      <label
                        htmlFor="email"
                        className={clsx(styles.formLabel, styles.row)}
                      >
                        Email:
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={account?.gmail}
                        onChange={(e) => setEmail(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="Email..."
                        required
                      />
                    </div>

                    <div className={clsx(styles.formField, styles.col3)}>
                      <label
                        htmlFor="phone"
                        className={clsx(styles.formLabel, styles.row)}
                      >
                        Số điện thoại:
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={account?.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="Số điện thoại..."
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className={clsx(styles.avatarInput, styles.col)}>
                  <ImageUploader
                    avatarImg={avatarImg}
                    onAvatarChange={setAvatarImg}
                  />
                </div>
              </div>
              <div className={clsx(styles.formRow, styles.formFooter)}>
                <button
                  value="Submit"
                  type="submit"
                  className={clsx(styles.btn, styles.primary)}
                >
                  THAY ĐỔI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TabPassword(props) {
  const { children, value, account, ...other } = props;
  const [firstName, setFirstName] = useState('Đinh Tiến Vũ');
  const [email, setEmail] = useState('dtv@gmail.com');
  const [phone, setPhone] = useState('0123456798');
  const [gender, setGender] = useState('male');
  const [birthday, setBirthday] = useState('2000-08-04');
  const [address, setAddress] = useState('Ninh Bình');
  const [password, setPassword] = useState('123456');
  const [oldPassword, setOldPassword] = useState('123456');
  const [newPassword, setNewPassword] = useState('123456');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarImg, setAvatarImg] = useState(imageTest);
  const [errMsg, setErrMsg] = useState('');

  const [open, setOpen] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setErrMsg('');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const REGISTER_URL = `/api/v1/register`;
    if (password !== oldPassword) {
      setErrMsg('Sai mật khẩu!');
    }
    if (newPassword !== confirmPassword) {
      setErrMsg('Mật khẩu không khớp!');
    }
    if (newPassword.length < 6) {
      setErrMsg('Mật khẩu phải chứa ít nhất 6 kí tự!');
    }

    if (errMsg === '') {
      let data = {};
      const bday = new Date(birthday);
      data = {
        email: email,
        firstName: firstName,
        phoneNumber: phone,
        gender: gender,
        birthDay: bday,
        address: address,
        password: password,
        avatar: avatarImg,
      };
      try {
        const response = await axios.post(REGISTER_URL, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
          },
          // withCredentials: true,
        });
        setSuccess(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg('No Server Response');
          setOpen(true);
        } else {
          setErrMsg('Thay đổi thất bại.');
          console.log(err);
          setOpen(true);
        }
      }
    }
  }


  useEffect(() => {
    if (errMsg !== '') {
      setOpen(true);
    }
  }, [errMsg]);
  return (
    <div>
      {value === 1 &&(
        <div className={clsx(styles.registerContainerPassWorld, styles.row)}>
          <div
            className={
              errMsg
                ? clsx(styles.snackbar, styles.show)
                : clsx(styles.snackbar, styles.offscreen)
            }
            aria-live="assertive"
          >
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: '100%' }}
              >
                {errMsg}
              </Alert>
            </Snackbar>
          </div>
          <div className={clsx(styles.registerForm)}>
            <form onSubmit={handleSubmit} className={clsx(styles.row)}>
              <div className={clsx(styles.formTitle, styles.row)}>
                <h2 className={clsx(styles.title)}> Thay đổi mật khẩu </h2>
              </div>

              <div className={clsx(styles.row, styles.formRow)}>
                <div className={clsx(styles.formLeft)}>
                  <div className={clsx(styles.formRow, styles.row)}>
                    <label
                        htmlFor="oldPassword"
                        className={clsx(styles.formLabel, styles.row)}
                      >
                        Mật khẩu cũ:
                    </label>
                    <div className={clsx(styles.formField, styles.col3)}>
                      <input
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="Mật khẩu..."
                        required
                      />
                    </div>
                  </div>

                  <div className={clsx(styles.formRow, styles.row)}>
                    <label
                        htmlFor="newPassword"
                        className={clsx(styles.formLabel, styles.row)}
                      >
                        Mật khẩu mới:
                    </label>
                    <div className={clsx(styles.formField, styles.col3)}>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="Mật khẩu..."
                        required
                      />
                    </div>
                  </div>

                  <div className={clsx(styles.formRow, styles.row)}>
                    <label
                        htmlFor="confirmPassword"
                        className={clsx(styles.formLabel, styles.row)}
                      >
                        Nhập lại mật khẩu:
                    </label>
                    <div className={clsx(styles.formField, styles.col3)}>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={clsx(styles.formInput, styles.row)}
                        placeholder="Mật khẩu..."
                        required
                      />
                    </div>
                  </div>

                </div>
              </div>
              <div className={clsx(styles.formRow, styles.formFooter)}>
                <button
                  value="Submit"
                  type="submit"
                  className={clsx(styles.btn, styles.primary)}
                >
                  THAY ĐỔI
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const defautlAvatar =
  'https://res.cloudinary.com/trinhvanthoai/image/upload/v1655489389/thoaiUploads/defaultAvatar_jxx3b9.png';

function ReaderAccount({navigation, account}) {
    const [value, setValue] = React.useState(0);
    const [user, setUser] = React.useState();

    function getData(){
      UsersAPI.getUserById(localStorage.getItem('id')).then((res) => {
        let bookListRes = res.data;
        setUser(bookListRes.data)
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

    return (
        <div className="account">
            <Header navigation={navigation} />

            <div className={styles.content} >
                <div className={styles.wraper}>
                    <p className={styles.tdisplay}> Quản lý tài khoản </p>
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
                            <Tab value={0} label="Thông tin tài khoản"/>
                            <Tab value={1} label="Thay đổi mật khẩu" />
                        </Tabs>
                        <TabInfor value={value} index={0} account={user}>        
                        </TabInfor>
                        <TabPassword value={value} index={1} account={user}>
                        </TabPassword>
                    </Box> 
                </div>
            </div>
            <Footer navigation={navigation} />
        </div>
    );
}
export default ReaderAccount;
