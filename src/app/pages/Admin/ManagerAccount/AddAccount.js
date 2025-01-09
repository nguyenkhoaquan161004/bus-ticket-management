import React, { useState } from "react";
import styles from "./ManagerAccount.module.css";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";

const AddAccount = ({ isOpen, onClose, onAddAccount }) => {
  const [CCCD, setCCCD] = useState("");
  const [fullname, setFullName] = useState("");
  const [role, setRole] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = React.useState("");

  const handleChangePosition = (event) => {
    setRole(event.target.value);
  };

  const handleChangeSex = (event) => {
    setSex(event.target.value);
  };

  const handleAddAccount = async () => {
    if (
      !fullname ||
      !role ||
      !sex ||
      !phone ||
      !email ||
      !password ||
      !password
    ) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const newAccount = {
      accountID: CCCD,
      name: fullname,
      gender: sex,
      phoneNumber: phone,
      address: "Unknown",
      password,
      userName: email,
      userType: role,
      status: status,
    };

    try {
      const response = await axios.post(
        "http://localhost:5278/api/Account",
        newAccount
      );
      if (response.status === 201) {
        alert("Tài khoản đã được thêm thành công!");
        onAddAccount(response.data);
        onClose();
      } else {
        alert("Thêm tài khoản thất bại!");
      }
    } catch (error) {
      console.error("Error adding account:", error);
      alert("Đã xảy ra lỗi!");
    }

    onAddAccount(newAccount);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className={styles.addAccountWrapper}>
      <div className={styles.addBoxContainer}>
        <div className={styles.buttonBackContainer}>
          <button className={styles.buttonBack} onClick={onClose}>
            <InlineIcon
              icon="ic:round-arrow-back-ios"
              className={styles.icon}
            ></InlineIcon>
          </button>
        </div>
        <div className={styles.mainFlexboxContainer}>
          <div className={styles.mainFlexbox}>
            <h4>THÊM MỘT TÀI KHOẢN</h4>
            {/* FORM TO ADD ACCOUNT */}
            <div className={styles.fillInfoContainer}>
              <div className={styles.name}>
                <p className="uiSemibold">Họ và tên</p>
                <input
                  type="text"
                  className={styles.inputField}
                  placeholder="Nguyễn Văn A"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                ></input>
              </div>
              <div className={styles.name}>
                <p className="uiSemibold">Giới tính</p>
                <FormControl
                  sx={{ minWidth: "100%", width: 390, borderRadius: 10 }}
                >
                  <Select
                    value={sex}
                    onChange={handleChangeSex}
                    displayEmpty
                    sx={{
                      borderRadius: "10px",
                      outline: "none",
                      textAlign: "left",
                    }}
                  >
                    <MenuItem value={"Nam"}>Nam</MenuItem>
                    <MenuItem value={"Nữ"}>Nữ</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className={styles.name}>
                <p className="uiSemibold">Chức vụ</p>
                <FormControl
                  sx={{ minWidth: "100%", width: 390, borderRadius: 10 }}
                >
                  <Select
                    value={role}
                    onChange={handleChangePosition}
                    displayEmpty
                    sx={{
                      borderRadius: "10px",
                      outline: "none",
                      textAlign: "left",
                    }}
                  >
                    <MenuItem value={"Khách hàng"}>Khách hàng</MenuItem>
                    <MenuItem value={"Nhân viên"}>Nhân viên</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className={styles.name}>
                <p className="uiSemibold">Số điện thoại</p>
                <input
                  type="tel"
                  className={styles.inputField}
                  placeholder="0xx xxx xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
              </div>

              <div className={styles.name}>
                <p className="uiSemibold">Email</p>
                <input
                  type="email"
                  className={styles.inputField}
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div className={styles.name}>
                <p className="uiSemibold">Mật khẩu</p>
                <input
                  type="password"
                  className={styles.inputField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              <div className={styles.name}>
                <p className="uiSemibold">Trạng thái</p>
                <FormControl
                  sx={{ minWidth: "100%", width: 390, borderRadius: 10 }}
                >
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    displayEmpty
                    sx={{
                      borderRadius: "10px",
                      outline: "none",
                      textAlign: "left",
                    }}
                  >
                    <MenuItem value={"Hoạt động"}>Hoạt động</MenuItem>
                    <MenuItem value={"Ngưng hoạt động"}>
                      Ngưng hoạt động
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className={styles.name}>
                <p className="uiSemibold">CCCD</p>
                <input
                  type="text"
                  className={styles.inputField}
                  value={CCCD}
                  onChange={(e) => setCCCD(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <button className={styles.buttonAdd} onClick={handleAddAccount}>
            <p className="uiSemibold">Tạo tài khoản</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
