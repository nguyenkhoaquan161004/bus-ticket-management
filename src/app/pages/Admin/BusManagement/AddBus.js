import React, { useState } from 'react';
import styles from './BusManagement.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { FormControl, MenuItem, Select } from '@mui/material';

const AddAccount = ({ isOpen, onClose, onAddBus }) => {
    const [id, setId] = useState('');
    const [numberSeats, setNumberSeats] = useState('');
    const [carId, setCarId] = useState('');
    const [type, setType] = React.useState('');
    const [routes, setRoutes] = useState('');
    const [driver, setDriver] = useState('');

    const [error, setError] = useState('');

    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    const handleAddTicket = () => {
        if (!id || !numberSeats || !carId || !type || !routes || !driver) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        const newTicket = {
            id,
            numberSeats,
            carId,
            type,
            routes,
            driver,
        }
        onAddBus(newTicket);
        setError('');
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
                        <h4>THÊM MỘT BUS</h4>
                        {/* FORM TO ADD ACCOUNT */}
                        <div className={styles.fillInfoContainer}>
                            <div className={styles.name}>
                                <p className='uiSemibold'>ID</p>
                                <input
                                    type="number"
                                    className={styles.inputField}
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Số ghế</p>
                                <input
                                    type="number"
                                    className={styles.inputField}
                                    onChange={(e) => setNumberSeats(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Biển số</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    onChange={(e) => setCarId(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Loại xe</p>
                                <FormControl sx={{ minWidth: "100%", width: 390, borderRadius: 10 }}>
                                    <Select
                                        value={type}
                                        onChange={handleChangeType}
                                        displayEmpty
                                        sx={{
                                            borderRadius: "10px",
                                            outline: "none",
                                            textAlign: "left",
                                        }}     >
                                        <MenuItem value={10}>Thường</MenuItem>
                                        <MenuItem value={20}>VIP</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Tuyến trình</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    onChange={(e) => setRoutes(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Người lái xe</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    onChange={(e) => setDriver(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    <button className={styles.buttonAdd}
                        onClick={handleAddTicket}><p className='uiSemibold'>Tạo bus</p></button>
                </div>
            </div>
        </div>
    );
};

export default AddAccount;