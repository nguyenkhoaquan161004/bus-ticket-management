import React, { useMemo, useState } from 'react';
import styles from './ChooseSeatRoundTrip.module.css';
import ButtonBack from '../../../components/ButtonBack/ButtonBack';
import SeatRows from '../ChooseSeatOneWay/SeatRows';
import { useLocation, useNavigate } from 'react-router-dom';

const ChooseSeatRoundTrip = () => {
    const [isConfirmBoxOpen, setIsConfirmBoxOpen] = useState(false);
    const [selectedSeatsOutbound, setSelectedSeatsOutbound] = useState({        ids: [],
        numbers: []});
    const [selectedSeatsReturn, setSelectedSeatsReturn] = useState({        ids: [],
        numbers: []});

    const location = useLocation();
    const selectedTrip = location.state?.selectedTrips || [];

    const nav = useNavigate();

    const handleOpenConfirmBox = () => {
        setIsConfirmBoxOpen(true);
    };

    const handleCloseConfirmBox = () => {
        setIsConfirmBoxOpen(false);
    };

    const costTicketOutbound = useMemo(
        () => selectedTrip[0].pricePerSeat * selectedSeatsOutbound.ids.length,
        [selectedTrip[0].pricePerSeat, selectedSeatsOutbound]
    );

    const costTicketReturn = useMemo(
        () => selectedTrip[1].pricePerSeat * selectedSeatsReturn.ids.length,
        [selectedTrip[1].pricePerSeat, selectedSeatsReturn]
    );

    if (!selectedTrip) {
        return <div style={{ marginTop: 200 }}>Không có thông tin chuyến. Vui lòng quay lại!</div>;
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
    // const handleSeatSelection = (seats) => {
    //     setSelectedSeats(seats);
    // }
    return (
        <div>
            <div>
                <ButtonBack />
                <h3 style={{ marginTop: 211, textAlign: "center" }}>
                    {selectedTrip[0].departPlace} - {selectedTrip[0].arrivalPlace}
                </h3>
                <div className={styles.mainContainer}>
                    {/* Lượt đi */}
                    <div className={styles.mainSpaceContainer}>
                        <SeatRows
                            seats={selectedTrip[0].seats}
                            onSeatChange={setSelectedSeatsOutbound}
                        />
                        <div className={styles.inforTicketContainer}>
                            <div className={styles.inforTicket}>
                                <h4>Thông tin lượt đi</h4>
                                <div className={styles.detailContainer}>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Tuyến xe:</p>
                                        <p className="uiMedium">{selectedTrip[0].departPlace} - {selectedTrip[0].arrivalPlace}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Thời gian xuất bến:</p>
                                        <p className="uiMedium">{formatDate(selectedTrip[0].departureTime)}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số lượng ghế: </p>
                                        <p className="uiMedium">{selectedSeatsOutbound.ids.length}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeatsOutbound.numbers.join(", ")}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium" style={{ fontWeight: 600 }}>Tổng tiền lượt đi: </p>
                                        <p className="uiMedium">{costTicketOutbound} VND</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lượt về */}
                    <div className={styles.mainSpaceContainer}>
                        <SeatRows
                            seats={selectedTrip[1].seats}
                            onSeatChange={setSelectedSeatsReturn}
                        />
                        <div className={styles.inforTicketContainer}>
                            <div className={styles.inforTicket}>
                                <h4>Thông tin lượt về</h4>
                                <div className={styles.detailContainer}>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Tuyến xe:</p>
                                        <p className="uiMedium"> {selectedTrip[1].departPlace} - {selectedTrip[1].arrivalPlace}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Thời gian xuất bến:</p>
                                        <p className="uiMedium">{formatDate(selectedTrip[1].departureTime)}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số lượng ghế: </p>
                                        <p className="uiMedium">{selectedSeatsReturn.ids.length}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeatsReturn.numbers.join(", ")}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium" style={{ fontWeight: 600 }}>Tổng tiền lượt về: </p>
                                        <p className="uiMedium">{costTicketReturn} VND</p>
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
                <div className={styles.confirmTicketSpace} onClick={handleCloseConfirmBox}>
                    <div
                        className={styles.confirmTicketContainer}
                        onClick={(e) => e.stopPropagation()}>
                        <h4>XÁC NHẬN ĐẶT VÉ</h4>
                        <div className={styles.confirmTicket}>
                            {/* Thông tin lượt đi */}
                            <div className={styles.confirmInforTicket}>
                                <h4>Thông tin lượt đi</h4>
                                <div className={styles.detailContainer}>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Tuyến xe:</p>
                                        <p className="uiMedium">{selectedTrip[0].departPlace} - {selectedTrip[0].arrivalPlace}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Thời gian xuất bến:</p>
                                        <p className="uiMedium">{formatDate(selectedTrip[0].departureTime)}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số lượng ghế: </p>
                                        <p className="uiMedium">{selectedSeatsOutbound.ids.length}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeatsOutbound.numbers.join(", ")}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium" style={{ fontWeight: 600 }}>Tổng tiền lượt đi: </p>
                                        <p className="uiMedium">{costTicketOutbound} VND</p>
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin lượt về */}
                            <div className={styles.confirmInforTicket}>
                                <h4>Thông tin lượt về</h4>
                                <div className={styles.detailContainer}>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Tuyến xe:</p>
                                        <p className="uiMedium"> {selectedTrip[1].departPlace} - {selectedTrip[1].arrivalPlace}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Thời gian xuất bến:</p>
                                        <p className="uiMedium">{formatDate(selectedTrip[1].departureTime)}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số lượng ghế: </p>
                                        <p className="uiMedium">{selectedSeatsReturn.ids.length}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium">Số ghế: </p>
                                        <p className="uiMedium">{selectedSeatsReturn.numbers.join(", ")}</p>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <p className="uiMedium" style={{ fontWeight: 600 }}>Tổng tiền lượt về: </p>
                                        <p className="uiMedium">{costTicketReturn} VND</p>
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
                                        nav('/customer/FillInfor', {
                                            state: {selectedTrip:selectedTrip, costTicketOutbound,
                                                costTicketReturn, location: `${selectedTrip[0].departPlace}  - ${selectedTrip[0].arrivalPlace}`,selectedSeats:selectedSeatsOutbound,selectedSeatsReturn:selectedSeatsReturn }
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

export default ChooseSeatRoundTrip;
