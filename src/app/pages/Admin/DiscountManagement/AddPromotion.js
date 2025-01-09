import React, { useState } from "react";
import styles from "./DiscountManagement.module.css";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";

const AddAccount = ({ isOpen, onClose, onAddPromotion }) => {
  const [namePromotion, setNamePromotion] = useState("");
  const [dateStart, setStartDate] = useState("");
  const [dateEnd, setEndDate] = useState("");
  const [percentDiscount, setDicount] = useState("");

  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAddPromotion = async () => {
    if (!namePromotion || !dateStart || !dateEnd || !percentDiscount) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const newPromotion = {
      promoId: parseInt(percentDiscount, 10),
      name: namePromotion,
      startDate: dateStart,
      endDate: dateEnd,
      discountPercent: parseInt(percentDiscount, 10),
    };

    try {
      const response = await axios.post(
        "http://localhost:5278/api/promotion",
        newPromotion
      );
      onAddPromotion(response.data);
      setError("");
      onClose();
    } catch (error) {
      console.error("Error adding promotion:", error);
      setError("Đã xảy ra lỗi khi thêm khuyến mãi.");
    }
  };

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
            <h4>THÊM MỘT KHUYẾN MÃI</h4>
            {/* FORM TO ADD ACCOUNT */}
            <div className={styles.fillInfoContainer}>
              <div className={styles.name}>
                <p className="uiSemibold">Tên khuyến mãi</p>
                <input
                  type="text"
                  className={styles.inputField}
                  value={namePromotion}
                  onChange={(e) => setNamePromotion(e.target.value)}
                ></input>
              </div>

              <div className={styles.name}>
                <p className="uiSemibold">Ngày bắt đầu</p>
                <input
                  type="date"
                  className={styles.inputField}
                  value={dateStart}
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>
              </div>
              <div className={styles.name}>
                <p className="uiSemibold">Ngày kết thúc</p>
                <input
                  type="date"
                  className={styles.inputField}
                  value={dateEnd}
                  onChange={(e) => setEndDate(e.target.value)}
                ></input>
              </div>
              <div className={styles.name}>
                <p className="uiSemibold">Phần trăm khuyến mãi</p>
                <input
                  type="number"
                  className={styles.inputField}
                  value={percentDiscount}
                  onChange={(e) => setDicount(e.target.value)}
                ></input>
              </div>
            </div>
            <div style={{ height: 18 }}>
              {error && (
                <p
                  className="uiRegular"
                  style={{ color: "#f44336", fontSize: 12 }}
                >
                  {error}
                </p>
              )}
            </div>
          </div>
          <button className={styles.buttonAdd} onClick={handleAddPromotion}>
            <p className="uiSemibold">Tạo khuyến mãi</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
