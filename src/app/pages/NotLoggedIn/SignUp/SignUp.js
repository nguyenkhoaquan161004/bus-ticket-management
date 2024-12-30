import React, { useState } from "react";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <h4>ĐĂNG KÝ TÀI KHOẢN CHO KHÁCH HÀNG</h4>
      <button>
        <InlineIcon
          icon="ic:round-arrow-back-ios"
          className={styles.icon}
        ></InlineIcon>
      </button>

      <div className={styles.fillInputContainer}>
        <div className={styles.inputDoubleItem}>
          <div className={styles.inputName}>
            <p className="uiSemibold">Họ và tên</p>
            <input type="text" placeholder="Nguyễn Văn A"></input>
          </div>
          <div className={styles.inputGender}>
            <p className="uiSemibold">Giới tính</p>
            <select
              className={styles.genderBox}
              value={selectedValue}
              onChange={handleChange}
            >
              <option value="">--Lựa chọn--</option>
              <option value="option1">Nam</option>
              <option value="option2">Nữ</option>
            </select>
          </div>
        </div>
        <div className={styles.inputItem}>
          <p className="uiSemibold">Số điện thoại</p>
          <input type="text" placeholder="0xxx xxx xxx"></input>
        </div>
        <div className={styles.inputItem}>
          <p className="uiSemibold">Email</p>
          <input type="email"></input>
        </div>
        <div className={styles.inputItem}>
          <p className="uiSemibold">CCCD</p>
          <input type="number"></input>
        </div>
        <div className={styles.inputPasswordItem}>
          <div className={styles.inputPassword}>
            <p className="uiSemibold">Mật khẩu</p>
            <input type="password"></input>
          </div>
          <div className={styles.inputPassword}>
            <p className="uiSemibold">Xác nhận mật khẩu</p>
            <input type="password"></input>
          </div>
        </div>
      </div>

      <button className={styles.buttonSignUp}>
        <h4>Đăng ký</h4>
      </button>
    </div>
  );
};

export default SignUp;
