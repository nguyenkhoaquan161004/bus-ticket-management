import React, { useState } from 'react';
import styles from "./BuyTicket.module.css";
import { useNavigate } from 'react-router-dom';

const ChooseRound = ({ rows, isRoundTrip }) => {
    const nav = useNavigate();

    // Hàm xử lý khi chọn chuyến
    const onChooseTrip = (row) => {
        if (isRoundTrip === true) {
            nav('/notLoggedIn/ChooseSeatRoundTrip', { state: { selectedTrip: row } });
        }
        if (isRoundTrip !== true) {
            nav('/notLoggedIn/ChooseSeatOneWay', { state: { selectedTrip: row } });
        }
    };

    return (
        <div>
            <div className={styles.resultList}>
                {rows.map((row, i) => (
                    <div key={i} className={styles.resultItem}>
                        <div className={styles.inforContainer}>
                            <div className={styles.roundInfor}>
                                <div className={styles.fromTo}>
                                    <p className='p1'>{row.timeStart}</p>
                                    <p className='p3' style={{ textAlign: "center" }}>{row.locationFrom}</p>
                                </div>
                                <div className={styles.duringTimeSpace}>
                                    <p className='p1'>{row.timeDuring} phút</p>
                                    <div className={styles.line}></div>
                                </div>
                                <div className={styles.fromTo}>
                                    <p className='p1'>{row.timeEnd}</p>
                                    <p className='p3' style={{ textAlign: "center" }}>{row.locationTo}</p>
                                </div>
                            </div>

                            <div className={styles.roundGeneralInfor}>
                                <p className='p3'>{row.freeSeat} giường trống</p>
                                <p
                                    className='p3'
                                    style={{ color: "#D7987D" }}>{row.cost} VND</p>
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
