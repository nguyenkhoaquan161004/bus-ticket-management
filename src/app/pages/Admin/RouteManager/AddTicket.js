import React, { useState } from 'react';
import styles from './RouteManager.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { FormControl, MenuItem, Select } from '@mui/material';

const AddAccount = ({ isOpen, onClose, onAddTicket }) => {
    const [routeId, setRouteId] = useState('');
    const [date, setDate] = useState('');
    const [timeDuring, setTimeDuring] = useState('');
    const [locationFrom, setLocationFrom] = useState('');
    const [locationTo, setLocationTo] = useState('');
    const [stationFrom, setStationFrom] = useState('');
    const [stationTo, setStationTo] = useState('');
    const [costNormal, setCostNormal] = useState('');
    const [costVIP, setCostVIP] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleAddTicket = () => {
        if (!routeId || !date || !timeDuring || !locationFrom || !locationTo || !stationFrom || !stationTo || !costNormal || !costVIP) {
            setError("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        const newTicket = {
            id: routeId,
            date: date.split('-').reverse().join('/'),
            timeDuring,
            locationFrom,
            locationTo,
            stationFrom,
            stationTo,
            costNormal: `${costNormal}`,
            costVIP: `${costVIP}`,
        }
        onAddTicket(newTicket);
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
                        <h4>THÊM MỘT TUYẾN TRÌNH</h4>
                        {/* FORM TO ADD ACCOUNT */}
                        <div className={styles.fillInfoContainer}>
                            <div className={styles.name}>
                                <p className='uiSemibold'>ID</p>
                                <input
                                    type="number"
                                    className={styles.inputField}
                                    value={routeId}
                                    onChange={(e) => setRouteId(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Thời gian khởi hành</p>
                                <input
                                    type="datetime-local"
                                    className={styles.inputField}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Thời gian đi</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={timeDuring}
                                    onChange={(e) => setTimeDuring(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Điểm đi</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={locationFrom}
                                    onChange={(e) => setLocationFrom(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Điểm đến</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={locationTo}
                                    onChange={(e) => setLocationTo(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Trạm đi</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={stationFrom}
                                    onChange={(e) => setStationFrom(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Trạm đến</p>
                                <input
                                    type="text"
                                    className={styles.inputField}
                                    value={stationTo}
                                    onChange={(e) => setStationTo(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Đơn giá thường</p>
                                <input
                                    type="number"
                                    className={styles.inputField}
                                    value={costNormal}
                                    onChange={(e) => setCostNormal(e.target.value)}></input>
                            </div>

                            <div className={styles.name}>
                                <p className='uiSemibold'>Đơn giá VIP</p>
                                <input
                                    type="number"
                                    className={styles.inputField}
                                    value={costVIP}
                                    onChange={(e) => setCostVIP(e.target.value)}></input>
                            </div>
                            {error && <p className={styles.errorText}>{error}</p>}
                        </div>
                    </div>
                    <button className={styles.buttonAdd} onClick={handleAddTicket}>
                        <p className='uiSemibold'>Tạo tuyến trình</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAccount;