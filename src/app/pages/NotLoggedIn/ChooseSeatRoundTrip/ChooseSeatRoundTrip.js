import React, { useState } from 'react';
import styles from './ChooseSeatRoundTrip.module.css'
import ButtonBack from '../../../components/ButtonBack/ButtonBack';
import SeatRows from '../ChooseSeatOneWay/SeatRows';
import { useLocation, useNavigate } from 'react-router-dom';
import { use } from 'react';

const ChooseSeatRoundTrip = () => {
    const [isConfirmBoxOpen, setIsConfirmBoxOpen] = useState(false);
    const [selectedSeatsOutbound, setSelectedSeatsOutbound] = useState([]);
    const [selectedSeatsReturn, setSelectedSeatsReturn] = useState([]);

    const location = useLocation();
    const selectedTrip = location.state?.selectedTrip;

    const nav = useNavigate();

    const handleOpenConfirmBox = () => {
        setIsConfirmBoxOpen(true);
    }

    const handleCloseConfirmBox = () => {
        setIsConfirmBoxOpen(false);
    }

    if (!selectedTrip) {
        // Xử lý khi không có dữ liệu được truyền (ví dụ: người dùng truy cập trực tiếp qua URL)
        return <div style={{ marginTop: 200 }}>Không có thông tin chuyến. Vui lòng quay lại!</div>;
    }

    const handleSeatOutbountSelection = (seats) => {
        setSelectedSeatsOutbound(seats);

    }
    const handleSeatReturnSelection = (seats) => {
        setSelectedSeatsReturn(seats);
    }

    return (
        <div>
            <div>
                <ButtonBack></ButtonBack>
                <h3 style={{ marginTop: 211, textAlign: "center" }}> {selectedTrip.locationFrom} - {selectedTrip.locationTo}</h3>
                <div className={styles.mainContainer}>
                    <div className={styles.mainSpaceContainer}>
                        <SeatRows onSeatChange={handleSeatOutbountSelection}></SeatRows>
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
                                        <p className="uiMedium">{selectedSeatsOutbound.length}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeatsOutbound.join(", ")}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium" style={{ fontWeight: 600 }}>Tổng tiền lượt đi: </p>
                                        <p className="uiMedium">{selectedTrip.cost * selectedSeatsOutbound.length}VND</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mainSpaceContainer}>
                        <SeatRows onSeatChange={handleSeatReturnSelection}></SeatRows>
                        <div className={styles.inforTicketContainer}>
                            <div className={styles.inforTicket}>
                                <h4>Thông tin lượt về</h4>
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
                                        <p className="uiMedium">{selectedSeatsReturn.length}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeatsReturn.join(", ")}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium" style={{ fontWeight: 600 }}>Tổng tiền lượt đi: </p>
                                        <p className="uiMedium">{selectedTrip.cost * selectedSeatsReturn.length}VND</p>
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
                                        <p className="uiMedium">{selectedTrip.locationFrom} - {selectedTrip.locationFrom}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Thời gian xuất bến:</p>
                                        <p className="uiMedium">{selectedTrip.timeStart} {selectedTrip.dataTime} 09/12/2024</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số lượng ghế: </p>
                                        <p className="uiMedium">{selectedSeatsOutbound.length}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeatsOutbound.join(", ")}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium" style={{ fontWeight: 600 }}>Tổng tiền lượt đi: </p>
                                        <p className="uiMedium">{selectedTrip.cost * selectedSeatsOutbound.length}VND</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.confirmInforTicket}>
                                <h4>Thông tin lượt về</h4>
                                <div className={styles.detailContainer}>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Tuyến xe:</p>
                                        <p className="uiMedium">{selectedTrip.locationTo} - {selectedTrip.locationFrom}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Thời gian xuất bến:</p>
                                        <p className="uiMedium">{selectedTrip.timeStart} {selectedTrip.dataTime} 09/12/2024</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số lượng ghế: </p>
                                        <p className="uiMedium">{selectedSeatsReturn.length}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeatsReturn.join(", ")}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium" style={{ fontWeight: 600 }}>Tổng tiền lượt đi: </p>
                                        <p className="uiMedium">{selectedTrip.cost * selectedSeatsReturn.length}VND</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.confirmTicketButton}>
                                <button className={styles.btnCancel} onClick={handleCloseConfirmBox}>
                                    <h4>Hủy</h4>
                                </button>
                                <button className={styles.btnConfirm} onClick={() => nav("/notLoggedIn/FillInforRoundTrip")}>
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

export default ChooseSeatRoundTrip;