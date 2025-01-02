import React from "react";
import styles from "./Header.module.css";
import { useNavigate } from 'react-router-dom';
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import axios from 'axios'; 
export default function Header() {

  const nav = useNavigate();
  const handleSignOut = async () => {
    try {
        const response = await axios.post('http://localhost:5278/api/auth/signout');

        if (response.status === 200) {
            localStorage.clear();

      
        } else {
            console.error(response.data.message || 'Signout failed.');
        }
    } catch (error) {
        console.error('Error signing out:', error.response?.data || error.message);
    }
};
  return <div className={styles.headerContainer}>
    <div className={styles.headerFlexBox}>
      <div className={styles.logoAndNav}>
        <h3 onClick={() => nav("/customer")}>
          odau<span style={{ color: "#D7987D" }}>re</span>hon
        </h3>
        <nav>
          <button onClick={() => nav("/customer")}>
            <p className="uiSemibold">TRANG CHỦ</p>
          </button>
          <button onClick={() => nav("/customer")}>
            <p className="uiSemibold">ĐẶT VÉ</p>
          </button>
          <button onClick={() => nav("/customer/SearchTicket")}>
            <p className="uiSemibold">TRA CỨU</p>
          </button>
          <button>
            <p className="uiSemibold">LIÊN HỆ</p>
          </button>
        </nav>
      </div>
      <div className={styles.generalButton}>
        <button
          className={styles.btnSignUp}
          onClick={() => nav("/customer/History")}>
          <InlineIcon icon="iconamoon:profile-fill" className={styles.profileIcon}></InlineIcon>
        </button>
        <button
          className={styles.btnLogin}
          onClick={() => {
            nav("/");
            handleSignOut(); 
        }}>
          <p className="uiSemibold">ĐĂNG XUẤT</p>
        </button>
      </div>
    </div>
  </div>;
}
