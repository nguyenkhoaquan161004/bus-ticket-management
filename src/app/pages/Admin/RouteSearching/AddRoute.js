import React from 'react';
import styles from './RouteSearching.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
const AddRoute = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className={styles.addAccountWrapper}>
            <div className={styles.addBoxContainer}>
                <div className={styles.buttonBackContainer}>
                    <button className={styles.buttonBack} onClick={onClose}>
                        <InlineIcon icon="ic:round-arrow-back-ios" className={styles.icon}></InlineIcon>
                    </button>
                </div>
                <h4>THÊM MỘT TUYẾN TRÌNH</h4>
                {/* FORM TO ADD ACCOUNT */}
                <div className={styles.fillInfoContainer}>
                    <div className={styles.name}>
                        <p className='uiSemibold'>Điểm đi</p>
                        <input type="text" className={styles.inputField}></input>
                    </div>
                    <div className={styles.name}>
                        <p className='uiSemibold'>Điểm đến</p>
                        <input type="text" className={styles.inputField}></input>
                    </div>
                    <div className={styles.name}>
                        <p className='uiSemibold'>Ngày đi</p>
                        <input type="date" className={styles.inputField} placeholder='0xx xxx xxxx'></input>
                    </div>
                    <div className={styles.name}>
                        <p className='uiSemibold'>Giờ khởi hành</p>
                        <input type="time" className={styles.inputField}></input>
                    </div>
                </div>
                <button className={styles.buttonAdd}><p className='uiSemibold'>Tạo tài khoản</p></button>
            </div>
        </div>
    );
};

export default AddRoute;