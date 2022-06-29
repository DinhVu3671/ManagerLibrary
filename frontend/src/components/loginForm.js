import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect, useContext } from 'react';
import clsx from 'clsx';
import styles from './CSS/LoginFormCSS.module.scss';
import logoImage from '../assets/logo-design.png';
import logo from '../assets/logo.png'
import axios from '../config/axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Login_RegisterAPI from '../api/Login_RegisterAPI'
// import { AuthContext } from '../contextAPI/AuthContext';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginForm(props) {
  const [open, setOpen] = useState(false);
  // const history = useHistory();
  const navigate = useNavigate();
  // const { AuthDispatch } = useContext(AuthContext);

  const LOGIN_URL = `/api/v1/login`;
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  useEffect(() => {
    let r = '';

    setErrMsg(`Bạn đang đăng nhập`);
  });

  const navigatePath = function (path) {
    if (window.location.pathname !== path) {
      navigate(path);
    }
  };

  useEffect(() => {
    if (errMsg !== '') setOpen(true);
  }, [errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Login_RegisterAPI.loginCall({phone: user, password: pwd})
       
        
      console.log(response?.data);

      // if (response.data.status === 2) {
      //   setErrMsg('Tên đăng nhập hoặc mật khẩu không đúng.');
      //   setOpen(true);
      // } else {
      const data = response?.data;
      // AuthDispatch({ type: "LOGIN_SUCCESS", payload: data});
      localStorage.setItem('token', data.token);
      localStorage.setItem('fullName', data.data.fullName);
      localStorage.setItem('role', data.data.role);
      localStorage.setItem('id', data.data.id);
      localStorage.setItem('phone', data.data.phone);
      navigatePath('/')
      setUser('');
      setPwd('');
      setSuccess(true);
      
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
        setOpen(true);
      } else if (err.response?.status === 400) {
        setErrMsg('Missing email or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Email hoặc mật khẩu không đúng.');
        setOpen(true);
      } else {
        setErrMsg('Đăng nhập thất bại.');
        setOpen(true);
      }
      errRef.current.focus();
    }
  };

  return success ? (
    <h2>Return home </h2>
  ) : (
    <div className={clsx(styles.loginContainer, styles.row)}>
      <div
        ref={errRef}
        className={
          errMsg
            ? clsx(styles.snackbar, styles.show)
            : clsx(styles.snackbar, styles.offscreen)
        }
        aria-live="assertive"
      >
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {errMsg}
          </Alert>
        </Snackbar>
      </div>

      <div className={clsx(styles.loginLogo, styles.col)}>
        <div className={clsx(styles.imgContainer)}>
          <img
            src={logo}
            className={styles.logo}
            alt="search"
            onClick={() => navigatePath('/')}
          />
        </div>
        <span className={clsx(styles.logoTitle)}>
          <h1 className={styles.title}>
            Thư viện hàng đầu Việt Nam.
          </h1>
        </span>
      </div>

      <div className={clsx(styles.col, styles.loginForm)}>
        <form className={clsx(styles.row)} onSubmit={handleSubmit}>
          <div className={clsx(styles.formTitle, styles.row)}>
            <h2 className={clsx(styles.title)}> Đăng nhập </h2>
          </div>
          <div className={clsx(styles.formField, styles.row)}>
            <label
              htmlFor="email"
              className={clsx(styles.formLabel, styles.row)}
            >
              Phone:
            </label>
            <input
              id="phone"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              type="text"
              className={clsx(styles.formInput, styles.row)}
              required
            />
          </div>
          <div className={clsx(styles.formField, styles.row)}>
            <label
              htmlFor="password"
              className={clsx(styles.formLabel, styles.row)}
            >
              Mật khẩu:
            </label>
            <input
              id="password"
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              type="password"
              className={clsx(styles.formInput, styles.row)}
              required
            />
          </div>
          <button
            value="Submit"
            type="submit"
            className={clsx(styles.row, styles.btn, styles.primary)}
          >
            ĐĂNG NHẬP
          </button>
        </form>

        <span>
          Chưa có tài khoản?{' '}
          <Link to="/register" className={clsx(styles.col)}>
            Đăng ký
          </Link>{' '}
          ngay.
        </span>
      </div>
    </div>
  );
}

export default LoginForm;
