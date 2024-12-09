import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const nav = useNavigate();

  return <div className={styles.headerContainer}>
    <div className={styles.headerFlexBox}>
      <div className={styles.logoAndNav}>
        <h3 onClick={() => nav("/")}>
          odau<span style={{ color: "#D7987D" }}>re</span>hon
        </h3>
        <nav>
          <button onClick={() => nav("/")}>
            <p className="uiSemibold">TRANG CHỦ</p>
          </button>
          <button onClick={() => nav("/")}>
            <p className="uiSemibold">ĐẶT VÉ</p>
          </button>
          <button onClick={() => nav("/notLoggedIn/SearchTicket")}>
            <p className="uiSemibold">TRA CỨU</p>
          </button>
          <button>
            <p className="uiSemibold">LIÊN HỆ</p>
          </button>
        </nav>
      </div>
      <div className={styles.generalButton}>
        <button
          className={styles.btnLogin}
          onClick={() => nav("/Login")}>
          <p className="uiSemibold">ĐĂNG NHẬP</p>
        </button>
        <button
          className={styles.btnSignUp}
          onClick={() => nav("/SignUp")}>
          <p className="uiSemibold">ĐĂNG KÝ</p>
        </button>
      </div>
    </div>
  </div>;
}
