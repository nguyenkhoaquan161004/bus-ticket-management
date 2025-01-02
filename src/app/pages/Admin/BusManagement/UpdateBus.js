import React, { useState } from 'react';
import styles from './BusManagement.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { FormControl, MenuItem, Select } from '@mui/material';

const UpdateBus = ({ isOpen, onClose, onUpdateBus, id, numberSeats, carId, type, routes, driver }) => {
    const [updateNumberSeats, setNumberSeats] = useState('');
    const [updateCarId, setCarId] = useState('');
    const [updateType, setType] = React.useState('');
    const [updateRoutes, setRoutes] = useState('');
    const [updateDriver, setDriver] = useState('');

    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleChangeType = (event) => {
        setType(String(event.target.value));
    };

    const handleAddTicket = () => {
        if (!updateNumberSeats && !updateCarId && !updateType && !updateRoutes && !updateDriver) {
            alert("Vui lòng nhập đầy đủ thông tin cần cập nhật.");
            return;
        }

        const finalNumberSeats = updateNumberSeats.trim() || numberSeats;
        const finalCarId = updateCarId.trim() || carId;
        const finalType = updateType || type;
        const finalRoutes = updateRoutes.trim() || routes;
        const finalDriver = updateDriver.trim() || driver;

        onUpdateBus(finalNumberSeats, finalCarId, finalType, finalRoutes, finalDriver);
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
                        <h4>THÊM MỘT BUS</h4>
                        {/* FORM TO ADD ACCOUNT */}
                        <div className={styles.fillInfoContainer}>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Số ghế</p>
                                <input
                                    type="number"
                                    className={styles.inputField}
                                    placeholder={numberSeats}
                                    value={updateNumberSeats}
                                    onChange={(e) => setNumberSeats(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Biển số</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    placeholder={carId}
                                    value={updateCarId}
                                    onChange={(e) => setCarId(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Loại xe</p>
                                <FormControl sx={{ minWidth: "100%", width: 390, borderRadius: 10 }}>
                                    <Select
                                        value={updateType}
                                        onChange={handleChangeType}
                                        displayEmpty
                                        sx={{
                                            borderRadius: "10px",
                                            outline: "none",
                                            textAlign: "left",
                                        }}     >
                                        <MenuItem value={"Thường"}>Thường</MenuItem>
                                        <MenuItem value={'VIP'}>VIP</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Tuyến trình</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    placeholder={routes}
                                    value={updateRoutes}
                                    onChange={(e) => setRoutes(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Người lái xe</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    placeholder={driver}
                                    value={updateDriver}
                                    onChange={(e) => setDriver(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    <button className={styles.buttonAdd}
                        onClick={handleAddTicket}><p className='uiSemibold'>Cập nhật</p></button>
                </div>
            </div>
        </div>
    );
};

export default UpdateBus;