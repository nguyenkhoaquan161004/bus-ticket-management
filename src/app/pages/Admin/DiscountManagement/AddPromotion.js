import React, { useState } from 'react';
import styles from './DiscountManagement.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { FormControl, MenuItem, Select } from '@mui/material';

const AddAccount = ({ isOpen, onClose, onAddPromotion }) => {
    const [namePromotion, setNamePromotion] = useState('');
    const [dateStart, setStartDate] = useState('');
    const [dateEnd, setEndDate] = useState('');
    const [precentDiscount, setDicount] = useState('');

    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleAddPromotion = () => {
        if (!namePromotion || !dateStart || !dateEnd || !precentDiscount) {
            setError('Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        const newPromotion = {
            id: Math.random().toString(36).substring(2, 15),
            namePromotion,
            dateStart: dateStart.split('-').reverse().join('/'),
            dateEnd: dateEnd.split('-').reverse().join('/'),
            precentDiscount: `${precentDiscount}%`,
        }
        onAddPromotion(newPromotion);
        setError('');
        onClose();
    }
    return (
        <div className={styles.addAccountWrapper}>
            <div className={styles.addBoxContainer}>
                <div className={styles.buttonBackContainer}>
                    <button className={styles.buttonBack} onClick={onClose}>
                        <InlineIcon icon="ic:round-arrow-back-ios" className={styles.icon}></InlineIcon>
                    </button>
                </div>
                <div className={styles.mainFlexboxContainer}>

                    <div className={styles.mainFlexbox}>
                        <h4>THÊM MỘT KHUYẾN MÃI</h4>
                        {/* FORM TO ADD ACCOUNT */}
                        <div className={styles.fillInfoContainer}>
                            <div className={styles.name}>
                                <p className='uiSemibold'>Tên khuyến mãi</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={namePromotion}
                                    onChange={(e) => setNamePromotion(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Ngày bắt đầu</p>
                                <input
                                    type="date"
                                    className={styles.inputField}
                                    value={dateStart}
                                    onChange={(e) => setStartDate(e.target.value)}></input>
                            </div>
                            <div className={styles.name}>
                                <p className='uiSemibold'>Ngày kết thúc</p>
                                <input
                                    type="date"
                                    className={styles.inputField}
                                    value={dateEnd}
                                    onChange={(e) => setEndDate(e.target.value)}></input>
                            </div>
                            <div className={styles.name}>
                                <p className='uiSemibold'>Phần trăm khuyến mãi</p>
                                <input
                                    type="number"
                                    className={styles.inputField}
                                    value={precentDiscount}
                                    onChange={(e) => setDicount(e.target.value)}></input>
                            </div>
                        </div>
                        <div style={{ height: 18 }}>
                            {error && <p className="uiRegular" style={{ color: "#f44336", fontSize: 12 }}>{error}</p>}
                        </div>
                    </div>
                    <button
                        className={styles.buttonAdd}
                        onClick={handleAddPromotion}>
                        <p className='uiSemibold'>Tạo khuyến mãi</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAccount;