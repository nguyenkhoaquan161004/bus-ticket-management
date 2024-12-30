import React, { useState } from 'react';
import styles from './DiscountManagement.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { FormControl, MenuItem, Select } from '@mui/material';

const UpdateAccount = ({ isOpen, onClose, onUpdatePromotion, namePromotion, dateStart, dateEnd, percentDiscount }) => {
    const [upadteNamePromotion, setNamePromotion] = useState('');
    const [updateDateStart, setStartDate] = useState('');
    const [updateDateEnd, setEndDate] = useState('');
    const [updatePercentDiscount, setDicount] = useState('');

    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleAddPromotion = () => {
        if (!upadteNamePromotion && !updateDateStart && !updateDateEnd && !updatePercentDiscount) {
            setError('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        const finalName = upadteNamePromotion.trim() || namePromotion;
        const finalDateStart = updateDateStart.trim() || dateStart;
        const finalDateEnd = updateDateEnd.trim() || dateEnd;
        const finalPercentDiscount = updatePercentDiscount.trim() || percentDiscount;

        onUpdatePromotion(finalName, finalDateStart, finalDateEnd, finalPercentDiscount);
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
                        <h4>CẬP NHẬT KHUYẾN MÃI</h4>
                        {/* FORM TO ADD ACCOUNT */}
                        <div className={styles.fillInfoContainer}>
                            <div className={styles.name}>
                                <p className='uiSemibold'>Tên khuyến mãi</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    placeholder={namePromotion}
                                    value={upadteNamePromotion}
                                    onChange={(e) => setNamePromotion(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Ngày bắt đầu</p>
                                <input
                                    type="date"
                                    className={styles.inputField}
                                    placeholder={dateStart}
                                    value={updateDateStart}
                                    onChange={(e) => setStartDate(e.target.value)}></input>
                            </div>
                            <div className={styles.name}>
                                <p className='uiSemibold'>Ngày kết thúc</p>
                                <input
                                    type="date"
                                    className={styles.inputField}
                                    placeholder={dateEnd}
                                    value={updateDateEnd}
                                    onChange={(e) => setEndDate(e.target.value)}></input>
                            </div>
                            <div className={styles.name}>
                                <p className='uiSemibold'>Phần trăm khuyến mãi</p>
                                <input
                                    type="number"
                                    className={styles.inputField}
                                    placeholder={percentDiscount}
                                    value={updatePercentDiscount}
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
                        <p className='uiSemibold'>Cập nhật</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateAccount;