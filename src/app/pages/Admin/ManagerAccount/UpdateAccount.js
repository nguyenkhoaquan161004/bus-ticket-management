import React, { useState } from 'react';
import styles from './ManagerAccount.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { FormControl, MenuItem, Select } from '@mui/material';

const UpdateAccount = ({ isOpen, onClose, onUpdateAccount, selectedRow }) => {
    const [updateFullname, setFullName] = useState('');
    const [updateRole, setRole] = React.useState('');
    const [updateSex, setSex] = React.useState('');
    const [updatePhone, setPhone] = useState('');
    const [updateEmail, setEmail] = useState('');
    const [updatePassword, setPassword] = useState('');
    const [updateStatus, setStatus] = React.useState('');
    const [updateNote, setNotes] = useState('');

    const handleChangePosition = (event) => {
        setRole(event.target.value);
    };

    const handleChangeSex = (event) => {
        setSex(event.target.value);
    };

    const handleUpdateAccount = () => {
        if (!updateFullname && !updateRole && !updateSex && !updatePhone && !updateEmail && !updateStatus && !updatePassword && !updateNote) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        const finalFullname = updateFullname.trim() || selectedRow.fullname;
        const finalRole = updateRole || selectedRow.role;
        const finalSex = updateSex || selectedRow.sex;
        const finalPhone = updatePhone.trim() || selectedRow.phone;
        const finalEmail = updateEmail.trim() || selectedRow.email;
        const finalStatus = updateStatus || selectedRow.status;
        const finalPassword = updatePassword.trim() || selectedRow.password;
        const finalNotes = updateNote.trim() || selectedRow.note;

        onUpdateAccount(finalFullname, finalSex, finalPhone, finalEmail, finalPassword, finalStatus, finalNotes);
        onClose();
    }


    if (!isOpen) return null;
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
                        <h4>CẬP NHẬT TÀI KHOẢN</h4>
                        {/* FORM TO ADD ACCOUNT */}
                        <div className={styles.fillInfoContainer}>
                            <div className={styles.name}>
                                <p className='uiSemibold'>Họ và tên</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    placeholder='Nguyễn Văn A'
                                    value={updateFullname}
                                    onChange={(e) => setFullName(e.target.value)}></input>
                            </div>
                            <div className={styles.name}>
                                <p className='uiSemibold'>Giới tính</p>
                                <FormControl sx={{ minWidth: "100%", width: 390, borderRadius: 10 }}>
                                    <Select
                                        value={updateSex}
                                        onChange={handleChangeSex}
                                        displayEmpty
                                        sx={{
                                            borderRadius: "10px",
                                            outline: "none",
                                            textAlign: "left",
                                        }}
                                    >
                                        <MenuItem value={'Nam'}>Nam</MenuItem>
                                        <MenuItem value={'Nữ'}>Nữ</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Chức vụ</p>
                                <FormControl sx={{ minWidth: "100%", width: 390, borderRadius: 10 }}>
                                    <Select
                                        value={updateRole}
                                        onChange={handleChangePosition}
                                        displayEmpty
                                        sx={{
                                            borderRadius: "10px",
                                            outline: "none",
                                            textAlign: "left",
                                        }}
                                    >
                                        <MenuItem value={'Khách hàng'}>Khách hàng</MenuItem>
                                        <MenuItem value={'Nhân viên'}>Nhân viên</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Số điện thoại</p>
                                <input
                                    type="tel"
                                    className={styles.inputField}
                                    placeholder='0xx xxx xxxx'
                                    value={updatePhone}
                                    onChange={(e) => setPhone(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Email</p>
                                <input
                                    type="email"
                                    className={styles.inputField}
                                    placeholder='abc@gmail.com'
                                    value={updateEmail}
                                    onChange={(e) => setEmail(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Mật khẩu</p>
                                <input
                                    type="password"
                                    className={styles.inputField}
                                    value={updatePassword}
                                    onChange={(e) => setPassword(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Trạng thái</p>
                                <FormControl sx={{ minWidth: "100%", width: 390, borderRadius: 10 }}>
                                    <Select
                                        value={updateStatus}
                                        onChange={(e) => setStatus(e.target.value)}
                                        displayEmpty
                                        sx={{
                                            borderRadius: "10px",
                                            outline: "none",
                                            textAlign: "left",
                                        }}
                                    >
                                        <MenuItem value={'Hoạt động'}>Hoạt động</MenuItem>
                                        <MenuItem value={'Ngưng hoạt động'}>Ngưng hoạt động</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Ghi chú</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={updateNote}
                                    onChange={(e) => setNotes(e.target.value)}></input>
                            </div>

                        </div>
                    </div>
                    <button className={styles.buttonAdd} onClick={handleUpdateAccount}><p className='uiSemibold'>Cập nhật</p></button>
                </div>
            </div>
        </div >
    );
};

export default UpdateAccount;