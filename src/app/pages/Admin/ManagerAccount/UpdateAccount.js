import React, { useState } from "react";
import styles from "./ManagerAccount.module.css";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

const UpdateAccount = ({ isOpen, onClose, onUpdateAccount, account }) => {
  const [CCCD, setCCCD] = useState(account.id || "");
  const [fullname, setFullName] = useState(account.name || "");
  const [role, setRole] = useState(account.userType || "");
  const [sex, setSex] = useState(account.gender || "");
  const [phone, setPhone] = useState(account.phoneNumber || "");
  const [email, setEmail] = useState(account.userName || "");
  const [password, setPassword] = useState(account.password || "");
  const [status, setStatus] = useState(account.status || "");
  const [note, setNotes] = useState(account.note || "");

  useEffect(() => {
    setCCCD(account.id || "");
    setFullName(account.name || "");
    setRole(account.userType || "");
    setSex(account.gender || "");
    setPhone(account.phoneNumber || "");
    setEmail(account.userName || "");
    setPassword(account.password || "");
    setStatus(account.status || "");
    setNotes(account.note || "");
  }, [account]);

  const handleChangePosition = (event) => {
    setRole(event.target.value);
  };

  const handleChangeSex = (event) => {
    setSex(event.target.value);
  };

  const handleUpdateAccount = async () => {
    if (!fullname || !role || !sex || !phone || !email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const updatedAccount = {
      accountID: CCCD,
      name: fullname,
      gender: sex,
      phoneNumber: phone,
      password,
      userName: email,
      userType: role,
      status: status,
      note: note,
    };

    try {
      const response = await axios.put(
        `http://localhost:5278/api/Account/${CCCD}`,
        updatedAccount
      );
      if (response.status === 200) {
        alert("Tài khoản đã được cập nhật thành công!");
        onUpdateAccount(response.data);
        onClose();
      } else {
        alert("Cập nhật tài khoản thất bại!");
      }
    } catch (error) {
      console.error("Error updating account:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        alert(
          `Đã xảy ra lỗi: ${error.response.data.message || "Unknown error"}`
        );
      } else {
        alert("Đã xảy ra lỗi!");
      }
    }
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
            <h4>CẬP NHẬT TÀI KHOẢN</h4>
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
                <p className="uiSemibold">Ghi chú</p>
                <input
                  type="text"
                  className={styles.inputField}
                  value={note}
                  onChange={(e) => setNotes(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <button className={styles.buttonAdd} onClick={handleUpdateAccount}>
            <p className="uiSemibold">Cập nhật</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccount;
