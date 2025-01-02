import React, { useState } from 'react';
import styles from './RouteManager.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { FormControl, MenuItem, Select } from '@mui/material';

const UpdateAccount = ({ isOpen, onClose, onUpdateTicket, date, timeDuring, locationFrom, locationTo, stationFrom, stationTo, costNormal, costVIP }) => {
    const [updateTimeDuring, setTimeDuring] = useState('');
    const [updateDate, setDate] = useState('');
    const [updateLocationFrom, setLocationFrom] = useState('');
    const [updateLocationTo, setLocationTo] = useState('');
    const [updateStationFrom, setStationFrom] = useState('');
    const [updateStationTo, setStationTo] = useState('');
    const [updateCostNormal, setCostNormal] = useState('');
    const [updateCostVIP, setCostVIP] = useState('');

    if (!isOpen) return null;

    const handleUpdateTicket = () => {
        if (!updateTimeDuring && !updateDate && !updateLocationFrom && !updateLocationTo && !updateStationFrom && !updateStationTo && !updateCostNormal && !updateCostVIP) {
            alert("Vui lòng nhập thông tin cần cập nhật.");
            return;
        }

        const finalDate = updateDate.trim() || date;
        const finalTimeDuring = updateTimeDuring.trim() || timeDuring;
        const finalLocationFrom = updateLocationFrom.trim() || locationFrom;
        const finalLocationTo = updateLocationTo.trim() || locationTo;
        const finalStationFrom = updateStationFrom.trim() || stationFrom;
        const finalStationTo = updateStationTo.trim() || stationTo;
        const finalCostNormal = updateCostNormal.trim() || costNormal;
        const finalCostVIP = updateCostVIP.trim() || costVIP;

        onUpdateTicket(finalDate, finalTimeDuring, finalLocationFrom, finalLocationTo, updateLocationTo, finalStationFrom, finalStationTo, finalCostNormal, finalCostVIP);
        onClose();
    }
    return (
        <div className={styles.updateAccountWrapper}>
            <div className={styles.updateBoxContainer}>
                <div className={styles.buttonBackContainer}>
                    <button className={styles.buttonBack} onClick={onClose}>
                        <InlineIcon icon="ic:round-arrow-back-ios" className={styles.icon}></InlineIcon>
                    </button>
                </div>
                <div className={styles.mainFlexboxContainer}>
                    <div className={styles.mainFlexbox}>

                        <h4>CẬP NHẬT THÔNG TIN VÉ</h4>
                        {/* FORM TO UPDATE ACCOUNT */}
                        <div className={styles.fillInfoContainer}>
                            <div className={styles.name}>
                                <p className='uiSemibold'>Thời gian khởi hành</p>
                                <input
                                    type="datetime-local"
                                    className={styles.inputField}
                                    value={updateDate}
                                    onChange={(e) => setDate(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Thời gian đi</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={updateTimeDuring}
                                    onChange={(e) => setTimeDuring(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Điểm đi</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={updateLocationFrom}
                                    onChange={(e) => setLocationFrom(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Điểm đến</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={updateLocationTo}
                                    onChange={(e) => setLocationTo(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Trạm đi</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={updateStationFrom}
                                    onChange={(e) => setStationFrom(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Trạm đến</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={updateStationTo}
                                    onChange={(e) => setStationTo(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Đơn giá thường</p>
                                <input
                                    type="number"
                                    className={styles.inputField}
                                    value={updateCostNormal}
                                    onChange={(e) => setCostNormal(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Đơn giá VIP</p>
                                <input
                                    type="number"
                                    className={styles.inputField}
                                    value={updateCostVIP}
                                    onChange={(e) => setCostVIP(e.target.value)}></input>
                            </div>

                        </div>
                    </div>
                    <button
                        className={styles.buttonUpdate}
                        onClick={handleUpdateTicket}
                    >
                        <p className='uiSemibold'>Cập nhật</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateAccount;