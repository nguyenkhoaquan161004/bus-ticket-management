import React, { useState } from "react";
import styles from "./Login.module.css";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";  

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5278/api/auth/signin", formData);

      if (response.status === 200) {
        const { accountType } = response.data;
        console.log(response.data.accountId);
         if ( response.data.accountId) {
        localStorage.setItem("accountId", response.data.accountId );
        localStorage.setItem("accountType", accountType );

      }  

        if (accountType === "Customer") {
          navigate("/customer");
        } else if (accountType === "TicketClerk") {
          navigate("/employee");
        } else if (accountType === "Admin") {
          navigate("/admin");
        } else {
          alert("Unknown account type");
        }

        
      } else {
        alert(response.data.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert("Đã có lỗi xảy ra, vui lòng thử lại!");
    }
  };


  return (
    <div className={styles.loginContainer}>
      <ButtonBack></ButtonBack>
      <div className={styles.contentContainer}>
        <div className={styles.loginFlexBox}>
          <h2 style={{ textAlign: "center" }}>ĐĂNG NHẬP</h2>
          <div className={styles.fillSpace}>
            <p className="uiSemibold">Email</p>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              className={styles.fillInput}
              placeholder="abc@gmail.com"
            ></input>
          </div>
          <div className={styles.fillSpace}>
            <p className="uiSemibold">Mật khẩu</p>
            <input type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange} className={styles.fillInput}></input>
          </div>
        </div>
        <button className={styles.forgotPassword}>
          <p style={{ textAlign: "right" }} className="p3">
            Quên mật khẩu?
          </p>
        </button>
      </div>
      <button onClick={handleSubmit}>
        <h4>Đăng nhập</h4>
      </button>
    </div>
  );
};

export default Login;
