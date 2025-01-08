import React, { useMemo, useState,useEffect } from 'react';
import styles from "./ChooseSeatOneWay.module.css";
import axios from 'axios';

import SeatRows from './SeatRows';
import ButtonBack from '../../../components/ButtonBack/ButtonBack';
import { useLocation, useNavigate } from 'react-router-dom';

const ChooseSeatOneWay = () => {
    const [isConfirmBoxOpen, setIsConfirmBoxOpen] = useState(false);
const [selectedSeats, setSelectedSeats] = useState({
    ids: [],
    numbers: []
});

    const [selectedTrip, setSelectedTrip] = useState(null);
    const [costTicket, setCostTicket] = useState(0); // Use state for dynamic updates
    const location = useLocation();
    const selectedNotification = location.state?.selectedNotification;

    const nav = useNavigate();

    const handleOpenConfirmBox = () => {
        setIsConfirmBoxOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5278/api/bookticket/bus-bus-route-change/${selectedNotification.notificationID}`
                );
                setSelectedTrip(response.data[0]);
    
                // Update costTicket dynamically
                setCostTicket(response.data[0].pricePerSeat);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        if (selectedNotification && selectedSeats.ids) {
            fetchData();
        }
    }, [selectedNotification, selectedSeats?.ids?.length]); // Optional chaining
    
    const handleCloseConfirmBox = () => {
        setIsConfirmBoxOpen(false);
    };

    const handleUpdateSeat = async () => {
        if (!selectedSeats.ids.length) {
            alert('Vui lòng chọn một ghế trước khi cập nhật.');
            return;
        }

        const requestData = {
            ClerkID: parseInt(localStorage.getItem("accountId")),
            NewSeatID: selectedSeats.ids[0],
            NotificationID: selectedNotification.notificationID,
        };

        try {
            const response = await axios.put('http://localhost:5278/update-ticket', requestData);

            if (response.status === 200) {
                alert('Cập nhật ghế thành công!');
                setIsConfirmBoxOpen(false);
            }
        } catch (error) {
            console.error('Error updating seat:', error);
            alert('Đã xảy ra lỗi khi cập nhật ghế. Vui lòng thử lại.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };

    if (!selectedTrip) {
        return <div>Không có thông tin chuyến. Vui lòng quay lại!</div>;
    }

    const handleSeatSelection = (seats) => {
        setSelectedSeats(seats);

        setCostTicket(selectedTrip.pricePerSeat * seats.ids.length);
    };

    return (
        <div>
            <div>
                <ButtonBack></ButtonBack>
                <h3 style={{ marginTop: 211, textAlign: "center" }}>{selectedTrip.departPlace} - {selectedTrip.arrivalPlace}</h3>
                <div className={styles.mainContainer}>
                    <div className={styles.mainSpaceContainer}>
                    {selectedTrip.seats ? (
                            <SeatRows seats={selectedTrip.seats} onSeatChange={handleSeatSelection} />
                        ) : (
                            <div>Loading seats...</div>
                        )}
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
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeats.numbers.join(", ")}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium" style={{ fontWeight: 600 }}>Tổng tiền lượt đi: </p>
                                        <p className="uiMedium">{selectedTrip.pricePerSeat}VND</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.btnFlexBox}>
                        <button onClick={handleOpenConfirmBox}>
                            <h4>Cập nhật vé</h4>
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
                        <h4>XÁC NHẬN CẬP NHẬT VÉ</h4>
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
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeats.numbers.join(", ")}</p>
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
                                    onClick={handleUpdateSeat}>
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