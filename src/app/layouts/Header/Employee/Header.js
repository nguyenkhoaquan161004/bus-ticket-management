import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from 'react-router-dom';
import { InlineIcon } from "@iconify/react/dist/iconify.js";

export default function Header() {

  const nav = useNavigate();

  return <div className={styles.headerContainer}>
    <div className={styles.headerFlexBox}>
      <div className={styles.logoAndNav}>
        <h3 onClick={() => nav("/employee")}>
          odau<span style={{ color: "#D7987D" }}>re</span>hon
        </h3>
        <nav>
          <button onClick={() => nav("/employee")}>
            <p className="uiSemibold">TRANG CHỦ</p>
          </button>
          <button onClick={() => nav("/employee")}>
            <p className="uiSemibold">ĐẶT VÉ</p>
          </button>
          <button onClick={() => nav("/employee/SearchTicket")}>
            <p className="uiSemibold">TRA CỨU</p>
          </button>
        </nav>
      </div>
      <div className={styles.generalButton}>
        <button
          className={styles.btnSignUp}>
          <InlineIcon icon="iconamoon:profile-fill" className={styles.profileIcon}></InlineIcon>
        </button>
        <button
          className={styles.btnLogin}
          onClick={() => nav("/")}>
          <p className="uiSemibold">ĐĂNG XUẤT</p>
        </button>
      </div>
    </div>
  </div>;
}
