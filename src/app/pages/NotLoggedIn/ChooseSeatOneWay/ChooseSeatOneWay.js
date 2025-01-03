import React, { useMemo, useState } from 'react';
import styles from "./ChooseSeatOneWay.module.css";

import SeatRows from './SeatRows';
import ButtonBack from '../../../components/ButtonBack/ButtonBack';
import { useLocation, useNavigate } from 'react-router-dom';

const ChooseSeatOneWay = () => {
    const [isConfirmBoxOpen, setIsConfirmBoxOpen] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);


    const location = useLocation();
    const selectedTrip = location.state?.selectedTrip;

    const nav = useNavigate();

    const costTicket = useMemo(() => selectedTrip.pricePerSeat * selectedSeats.length, [selectedTrip.pricePerSeat, selectedSeats]);

    const handleOpenConfirmBox = () => {
        setIsConfirmBoxOpen(true);
    }

    const handleCloseConfirmBox = () => {
        setIsConfirmBoxOpen(false);
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        const hours = date.getHours().toString().padStart(2, '0'); 
        const minutes = date.getMinutes().toString().padStart(2, '0'); 
        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear();
    
        return `${hours}:${minutes} ${day}/${month}/${year}`;

    }
    
    if (!selectedTrip) {
        return <div>Không có thông tin chuyến. Vui lòng quay lại!</div>;
    }

    const handleSeatSelection = (seats) => {
        setSelectedSeats(seats);
    }


    return (
        <div>
            <div>
                <ButtonBack></ButtonBack>
                <h3 style={{ marginTop: 211, textAlign: "center" }}>{selectedTrip.departPlace} - {selectedTrip.arrivalPlace}</h3>
                <div className={styles.mainContainer}>
                    <div className={styles.mainSpaceContainer}>
                        <SeatRows seats={selectedTrip.seats} onSeatChange={handleSeatSelection}></SeatRows>
                        <div className={styles.inforTicketContainer}>
                            <div className={styles.inforTicket}>
                                <h4>Thông tin lượt đi</h4>
                                <div className={styles.detailContainer}>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Tuyến xe:</p>
                                        <p className="uiMedium">{selectedTrip.departPlace} - {selectedTrip.arrivalPlace}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Thời gian xuất bến:</p>
                                        <p className="uiMedium">{formatDate(selectedTrip.departureTime)} </p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số lượng ghế: </p>
                                        <p className="uiMedium">{selectedSeats.length}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeats.join(", ")}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium" style={{ fontWeight: 600 }}>Tổng tiền lượt đi: </p>
                                        <p className="uiMedium">{costTicket}VND</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.btnFlexBox}>
                        <button onClick={handleOpenConfirmBox}>
                            <h4>Đặt vé</h4>
                        </button>
                    </div>

                </div>
            </div>


            {/* BOX CONFIRM TICKET */}
            {isConfirmBoxOpen && (
                <div
                    className={styles.confirmTicketSpace}
                    onClick={handleCloseConfirmBox}>
                    <div
                        className={styles.confirmTicketContainer}
                        onClick={(e) => e.stopPropagation()}>
                        <h4>XÁC NHẬN ĐẶT VÉ</h4>
                        <div className={styles.confirmTicket}>
                            <div className={styles.confirmInforTicket}>
                                <h4>Thông tin lượt đi</h4>
                                <div className={styles.detailContainer}>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Tuyến xe:</p>
                                        <p className="uiMedium">{selectedTrip.departPlace} - {selectedTrip.arrivalPlace}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Thời gian xuất bến:</p>
                                        <p className="uiMedium">{formatDate(selectedTrip.departureTime)}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số lượng ghế: </p>
                                        <p className="uiMedium">{selectedSeats.length}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeats.join(", ")}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium" style={{ fontWeight: 600 }}>Tổng tiền lượt đi: </p>
                                        <p className="uiMedium">{costTicket}VND</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.confirmTicketButton}>
                                <button className={styles.btnCancel} onClick={handleCloseConfirmBox}>
                                    <h4>Hủy</h4>
                                </button>
                                <button
                                    className={styles.btnConfirm}
                                    onClick={() => {
                                        nav('/FillInfor', {
                                            state: { costTicketOutbound: costTicket, location: `${selectedTrip.departPlace}  - ${selectedTrip.arrivalPlace}` }
                                        })
                                    }}>
                                    <h4>Xác nhận</h4>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default ChooseSeatOneWay;