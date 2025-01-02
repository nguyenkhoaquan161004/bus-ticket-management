import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [accountID, setAccountID] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSignUp = async () => {
    const accountData = {
      accountID,
      name,
      gender: selectedValue,
      phoneNumber,
      address,
      password,
      userName: accountID,
      userType: "Customer",
      status: "active",
    };

    if (
      !name ||
      !phoneNumber ||
      !address ||
      !password ||
      !selectedValue ||
      !accountID
    ) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5278/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountData),
      });

      alert(JSON.stringify(accountData));

      if (response.ok) {
        alert("Đăng ký thành công!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(
          `Đăng ký thất bại! Status: ${response.status}, Message: ${
            errorData.message || "No message provided"
          }`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Đã xảy ra lỗi!");
    }
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
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className={styles.inputGender}>
            <p className="uiSemibold">Giới tính</p>
            <select
              className={styles.genderBox}
              value={selectedValue}
              onChange={handleChange}
            >
              <option value="">Lựa chọn</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
        </div>
        <div className={styles.inputItem}>
          <p className="uiSemibold">Số điện thoại</p>
          <input
            type="text"
            placeholder="0xxx xxx xxx"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          ></input>
        </div>
        <div className={styles.inputItem}>
          <p className="uiSemibold">Địa chỉ</p>
          <input
            type="text"
            placeholder="Địa chỉ"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div className={styles.inputItem}>
          <p className="uiSemibold">Mật khẩu</p>
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className={styles.inputItem}>
          <p className="uiSemibold">CCCD</p>
          <input
            type="text"
            placeholder="CCCD"
            value={accountID}
            onChange={(e) => setAccountID(e.target.value)}
          ></input>
        </div>
        <div className={styles.inputItem}>
          <button className={styles.buttonSignUp} onClick={handleSignUp}>
            <h4>Đăng ký</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
