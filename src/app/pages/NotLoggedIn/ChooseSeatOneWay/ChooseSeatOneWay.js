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

    const costTicket = useMemo(() => selectedTrip.cost * selectedSeats.length, [selectedTrip.cost, selectedSeats]);

    const handleOpenConfirmBox = () => {
        setIsConfirmBoxOpen(true);
    }

    const handleCloseConfirmBox = () => {
        setIsConfirmBoxOpen(false);
    }

    if (!selectedTrip) {
        // Xử lý khi không có dữ liệu được truyền (ví dụ: người dùng truy cập trực tiếp qua URL)
        return <div>Không có thông tin chuyến. Vui lòng quay lại!</div>;
    }

    const handleSeatSelection = (seats) => {
        setSelectedSeats(seats);
    }


    return (
        <div>
            <div>
                <ButtonBack></ButtonBack>
                <h3 style={{ marginTop: 211, textAlign: "center" }}> TP. Hồ Chí Minh - Thốt Nốt</h3>
                <div className={styles.mainContainer}>
                    <div className={styles.mainSpaceContainer}>
                        <SeatRows onSeatChange={handleSeatSelection}></SeatRows>
                        <div className={styles.inforTicketContainer}>
                            <div className={styles.inforTicket}>
                                <h4>Thông tin lượt đi</h4>
                                <div className={styles.detailContainer}>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Tuyến xe:</p>
                                        <p className="uiMedium">{selectedTrip.locationFrom} - {selectedTrip.locationTo}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Thời gian xuất bến:</p>
                                        <p className="uiMedium">{selectedTrip.timeStart} {selectedTrip.dataTime} 09/12/2024</p>
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
                            </div>s
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
                                        <p className="uiMedium">Mien Tay - O Mon</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Thời gian xuất bến:</p>
                                        <p className="uiMedium">13:30 09/12/2024</p>
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
                                        nav('/notLoggedIn/FillInforOneWay', {
                                            state: { costTicket: costTicket, location: `${selectedTrip.locationFrom} - ${selectedTrip.locationTo}` }
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