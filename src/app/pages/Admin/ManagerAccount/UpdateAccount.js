import React from 'react';
import styles from './ManagerAccount.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { FormControl, MenuItem, Select } from '@mui/material';

const UpdateAccount = ({ isOpen, onClose }) => {
    const [position, setPosition] = React.useState('');
    const [sex, setSex] = React.useState('');

    const handleChangePosition = (event) => {
        setPosition(event.target.value);
    };

    const handleChangeSex = (event) => {
        setSex(event.target.value);
    };


    if (!isOpen) return null;
    return (
        <div className={styles.updateAccountWrapper}>
            <div className={styles.updateBoxContainer}>
                <div className={styles.buttonBackContainer}>
                    <button className={styles.buttonBack} onClick={onClose}>
                        <InlineIcon icon="ic:round-arrow-back-ios" className={styles.icon}></InlineIcon>
                    </button>
                </div>
                <h4>CẬP NHẬT TÀI KHOẢN</h4>
                {/* FORM TO UPDATE ACCOUNT */}
                <div className={styles.fillInfoContainer}>
                    <div className={styles.name}>
                        <p className='uiSemibold'>Họ và tên</p>
                        <input type="text" className={styles.inputField} placeholder='Nguyễn Văn A'></input>
                    </div>
                    <div className={styles.name}>
                        <p className='uiSemibold'>Giới tính</p>
                        <FormControl sx={{ minWidth: "100%", width: 390, borderRadius: 10 }}>
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
                                <MenuItem value={10}>Nam</MenuItem>
                                <MenuItem value={20}>Nữ</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className={styles.name}>
                        <p className='uiSemibold'>CCCD</p>
                        <input type="text" className={styles.inputField}></input>
                    </div>
                    <div className={styles.name}>
                        <p className='uiSemibold'>Số điện thoại</p>
                        <input type="text" className={styles.inputField} placeholder='0xx xxx xxxx'></input>
                    </div>
                    <div className={styles.name}>
                        <p className='uiSemibold'>Email</p>
                        <input type="text" className={styles.inputField} placeholder='abc@gmail.com'></input>
                    </div>
                    <div className={styles.name}>
                        <p className='uiSemibold'>Chức vụ</p>
                        <FormControl sx={{ minWidth: "100%", width: 390, borderRadius: 10 }}>
                            <Select
                                value={position}
                                onChange={handleChangePosition}
                                displayEmpty
                                sx={{
                                    borderRadius: "10px",
                                    outline: "none",
                                    textAlign: "left",
                                }}
                            >
                                <MenuItem value={10}>Khách hàng</MenuItem>
                                <MenuItem value={20}>Nhân viên</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <button className={styles.buttonUpdate}><p className='uiSemibold'>Cập nhật</p></button>
            </div>
        </div>
    );
};

export default UpdateAccount;