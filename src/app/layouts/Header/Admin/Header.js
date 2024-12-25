import React, { useState } from "react";
import styles from "./Header.module.css";
import { useNavigate } from 'react-router-dom';
import { InlineIcon } from "@iconify/react/dist/iconify.js";

export default function Header() {

  const [isOptionsActive, setIsOptionsActive] = useState(false);

  const nav = useNavigate();

  return <div className={styles.headerContainer}>
    <div className={styles.headerFlexBox}>
      <div className={styles.logoAndNav}>
        <h3 onClick={() => nav("/admin")}>
          odau<span style={{ color: "#D7987D" }}>re</span>hon
        </h3>
        <nav>
          <button onClick={() => nav("/admin")}>
            <p className="uiSemibold">TRANG CHỦ</p>
          </button>
          <div
            onMouseEnter={() => setIsOptionsActive(true)}
            onMouseLeave={() => setIsOptionsActive(false)}>
            <button>
              <p className="uiSemibold">QUẢN LÝ</p>
            </button>
            {isOptionsActive && (
              <div className={styles.navManagerBtns}>
                <button className={styles.itemBtn} onClick={() => nav("/admin/managerAccount")}>
                  <p className="uiSemibold">QUẢN LÝ TÀI KHOẢN</p>
                </button>
                <button className={styles.itemBtn} onClick={() => nav("/admin/changeInforTicket")}>
                  <p className="uiSemibold">QUẢN LÝ THÔNG TIN VÉ</p>
                </button>
                <button className={styles.itemBtn} onClick={() => nav("/admin/discountManagement")}>
                  <p className="uiSemibold">QUẢN LÝ KHUYẾN MÃI</p>
                </button>
                <button className={styles.itemBtn} onClick={() => nav("/admin/routeSearching")}>
                  <p className="uiSemibold">QUẢN LÝ TUYẾN TRÌNH</p>
                </button>
                <button className={styles.itemBtn} onClick={() => nav("/admin/busManagement")}>
                  <p className="uiSemibold">QUẢN LÝ BUS</p>
                </button>
              </div>)}
          </div>
          <button onClick={() => nav("/admin/reportScreen")}>
            <p className="uiSemibold">BÁO CÁO</p>
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
          onClick={() => nav("/")}>
          <p className="uiSemibold">ĐĂNG XUẤT</p>
        </button>
      </div>
    </div>
  </div>;
}
