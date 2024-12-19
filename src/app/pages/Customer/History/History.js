import React from 'react';
import ButtonBack from '../../../components/ButtonBack/ButtonBack';
import styles from './History.module.css';
import clsx from 'clsx';
import ticketsData from '../../../assets/TicketInformations';

const History = () => {
    const sortedTicketsData = [...ticketsData].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

    const handleCancelTicket = () => {
        alert("Đã gửi yêu cầu hủy vé")
    }
    return (
        <div className={styles.mainContainer}>
            <ButtonBack></ButtonBack>
            {/* USER INFORMATIONS SPACE */}
            <div className={styles.userInforSpace}>
                <h3>THÔNG TIN NGƯỜI DÙNG</h3>
                <div className={styles.fillInputContainer}>
                    <div className={styles.inputDoubleItem}>
                        <div className={styles.inputName}>
                            <p className={clsx("uiSemibold", styles.mainDetail)}>Họ và tên:</p>
                            <p className={clsx('p3', styles.contentDetail)}>Nguyen Khoa Quan</p>
                        </div>
                        <div className={styles.inputGender}>
                            <p className={clsx("uiSemibold", styles.mainDetail)}>Giới tính:</p>
                            <p className={clsx('p3', styles.contentDetail)}>Nam</p>
                        </div>

                    </div>
                    <div className={styles.inputDoubleItem}>
                        <div className={styles.inputItem}>
                            <p className={clsx("uiSemibold", styles.mainDetail)}>Số điện thoại:</p>
                            <p className={clsx('p3', styles.contentDetail)}>09*****936</p>
                        </div>
                        <div className={styles.inputItem}>
                            <p className={clsx("uiSemibold", styles.mainDetail)}>CCCD:</p>
                            <p className={clsx('p3', styles.contentDetail)}>087*****9876</p>
                        </div>

                    </div>
                    <div className={styles.inputItem}>
                        <p className={clsx("uiSemibold", styles.mainDetail)}>Email:</p>
                        <p className={clsx('p3', styles.contentDetail)}>khoaquan312@gmail.com</p>
                    </div>
                </div>
            </div>
            {/* HISTORY SPACE */}
            <div className={styles.historySpace}>
                <h3>LỊCH SỬ ĐẶT VÉ</h3>
                {sortedTicketsData.map((ticket, i) => {
                    const departureDate = new Date(ticket.dateTime);
                    const currentDate = new Date();

                    return (
                        <div key={i} className={styles.resultItemContainer}>
                            <div className={styles.resultItem}>
                                <div className={styles.infoField}>
                                    <p className={clsx(styles.topicField, 'uiSemibold')}>Mã vé</p>
                                    <p className={clsx(styles.contentField, 'p3')}>{ticket.id}</p>
                                </div>
                                <div className={styles.infoField}>
                                    <p className={clsx(styles.topicField, 'uiSemibold')}>Số ghế</p>
                                    <p className={clsx(styles.contentField, 'p3')}>{ticket.numberOfSeat}</p>
                                </div>
                                <div className={styles.infoField}>
                                    <p className={clsx(styles.topicField, 'uiSemibold')}>Điểm đi</p>
                                    <p className={clsx(styles.contentField, 'p3')}>{ticket.locationFrom}</p>
                                </div>
                                <div className={styles.infoField}>
                                    <p className={clsx(styles.topicField, 'uiSemibold')}>Điểm đến</p>
                                    <p className={clsx(styles.contentField, 'p3')}>{ticket.locationTo}</p>
                                </div>
                                <div className={styles.infoField}>
                                    <p className={clsx(styles.topicField, 'uiSemibold')}>Thời gian khởi hành</p>
                                    <p className={clsx(styles.contentField, 'p3')}>{ticket.dateTime}</p>
                                </div>
                                <div className={styles.infoField}>
                                    <p className={clsx(styles.topicField, 'uiSemibold')}>Số xe</p>
                                    <p className={clsx(styles.contentField, 'p3')}>{ticket.numberOfCar}</p>
                                </div>
                                <div className={styles.infoField}>
                                    <p className={clsx(styles.topicField, 'uiSemibold')}>Biển số xe</p>
                                    <p className={clsx(styles.contentField, 'p3')}>{ticket.idCar}</p>
                                </div>
                            </div>

                            {departureDate < currentDate ? (
                                <p className='uiSemibold'>Đã khởi hành</p>
                            ) : (
                                <button className={styles.cancelBtn} onClick={handleCancelTicket}><p className='uiSemibold'>Hủy vé</p></button>
                            )}
                            <hr style={{ width: "100%" }} />
                        </div>
                    )
                })}
            </div>
        </div >
    );
};

export default History;