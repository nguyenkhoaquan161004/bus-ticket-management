import React, { useState } from 'react';
import styles from "./BuyTicket.module.css";
import { useNavigate } from 'react-router-dom';

const ChooseRound = ({ rows, isRoundTrip }) => {
    const nav = useNavigate();

    // Hàm xử lý khi chọn chuyến
    const onChooseTrip = (row) => {
        const accountType = localStorage.getItem("accountType")
        if(accountType==="Customer"){
        if (isRoundTrip === true) {
            nav(`/customer/ChooseSeatRoundTrip`, { state: { selectedTrip: row } });
        }
        if (isRoundTrip !== true) {
            nav('/customer/ChooseSeatOneWay', { state: { selectedTrip: row } });
        }}
        else if(accountType==="Ticketcletk")
            {
                if (isRoundTrip === true) {
                    nav(`/employee/ChooseSeatRoundTrip`, { state: { selectedTrip: row } });
                }
                if (isRoundTrip !== true) {
                    nav('/employee/ChooseSeatOneWay', { state: { selectedTrip: row } });
                }}
        else
            {
                if (isRoundTrip === true) {
                    nav(`/admin/ChooseSeatRoundTrip`, { state: { selectedTrip: row } });
                }
                if (isRoundTrip !== true) {
                    nav('/admin/ChooseSeatOneWay', { state: { selectedTrip: row } });
                }}
};
    const calculateArrivalTime = (departureTime, duration) => {
        if (typeof duration !== 'string') {
            console.error('Duration is not a string:', duration);
            return '';
        }

        const departureDate = new Date(departureTime);
        const [durHours, durMinutes] = duration.split(':').map(Number);
        departureDate.setHours(departureDate.getHours() + durHours);
        departureDate.setMinutes(departureDate.getMinutes() + durMinutes);

        return departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const formatTime = (time) => {
        const date = new Date(time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const formatDuration = (duration) => {
        if (!duration) return '';
        const [hours, minutes] = duration.split(':');
        return `${hours} giờ ${minutes} phút`;
    };
    
    return (
        <div>
            <div className={styles.resultList}>
                {rows.map((row, i) => (
                    <div key={i} className={styles.resultItem}>
                        <div className={styles.inforContainer}>
                            <div className={styles.roundInfor}>
                                <div className={styles.fromTo}>
                                    <p className='p1'>{formatTime(row.departureTime)}</p>
                                    <p className='p3' style={{ textAlign: "center" }}>{row.departPlace}</p>
                                </div>
                                <div className={styles.duringTimeSpace}>
                                    <p className='p1'>{formatDuration(row.duration)}</p>
                                    <div className={styles.line}></div>
                                </div>
                                <div className={styles.fromTo}>
                                    <p className='p1'>{calculateArrivalTime(row.departureTime, row.duration)}</p>
                                    <p className='p3' style={{ textAlign: "center" }}>{row.arrivalPlace }</p>
                                </div>
                            </div>

                            <div className={styles.roundGeneralInfor}>
                                <p className='p3'>{row.seatsAvailable} giường trống</p>
                                <p
                                    className='p3'
                                    style={{ color: "#D7987D" }}>{row.pricePerSeat} VND</p>
                                <button onClick={() => onChooseTrip(row)}>
                                    <p2>Chọn chuyến</p2>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChooseRound;
