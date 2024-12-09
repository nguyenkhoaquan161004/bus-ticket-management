import React from 'react';
import styles from "./Login.module.css";
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import ButtonBack from '../../../components/ButtonBack/ButtonBack';

const Login = () => {
    return (
        <div className={styles.loginContainer}>
            <ButtonBack></ButtonBack>
            <div className={styles.contentContainer}>
                <div className={styles.loginFlexBox}>
                    <h2 style={{ textAlign: "center" }}>ĐĂNG NHẬP</h2>
                    <div className={styles.fillSpace}>
                        <p className='uiSemibold'>Số điện thoại hoặc Email</p>
                        <input
                            type="text"
                            className={styles.fillInput}
                            placeholder="0xx xxx xxxx / abc@gmail.com"></input>
                    </div>
                    <div className={styles.fillSpace}>
                        <p className='uiSemibold'>Mật khẩu</p>
                        <input
                            type="password"
                            className={styles.fillInput}></input>
                    </div>
                </div>
                <button className={styles.forgotPassword}>
                    <p
                        style={{ textAlign: 'right' }}
                        className='p3'>Quên mật khẩu?</p>
                </button>
            </div>
            <button >
                <h4>Đăng nhập</h4>
            </button>

        </div>
    );
};

export default Login;