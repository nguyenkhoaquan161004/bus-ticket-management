import React, { useContext, useState } from 'react';
import styles from './SearchingTicket.module.css'
import clsx from 'clsx';
import { EmployeeContext } from '../../modules/EmployeeContext';
import rows from '../../assets/TicketInformations';
import zIndex from '@mui/material/styles/zIndex';
import { Navigate, useNavigate } from 'react-router-dom';

const SearchingTicket = ({ onPrintBoxStateChange, onChangeTicketBoxStateChange }) => {
    const [searchIdTicket, setSearchIdTicket] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const [isResultOpen, setIsResultOpen] = useState(false);
    const { isEmployee } = useContext(EmployeeContext);

    const [isPrintBoxOpen, setIsPrintBoxOpen] = useState(false);
    const [isChangeTicketBoxOpen, setIsChangeTicketBoxOpen] = useState(false);

    const nav = useNavigate();

    const handleSearch = () => {
        const result = rows.filter(row => row.id.toString() === searchIdTicket);
        setFilteredRows(result);
    }

    const handleResultOpen = () => {
        setIsResultOpen(true);
    }

    const handleSearchButtonClick = () => {
        handleSearch();
        handleResultOpen();
    }

    const handleOpenPrintBox = () => {
        setIsPrintBoxOpen(true);
        onPrintBoxStateChange(true); // Gửi trạng thái lên cha
    };

    const handleClosePrintBox = () => {
        setIsPrintBoxOpen(false);
        onPrintBoxStateChange(false); // Gửi trạng thái lên cha
    };

    const handleOpenChangeTicketBox = () => {
        setIsChangeTicketBoxOpen(true);
        onChangeTicketBoxStateChange(true); // Gửi trạng thái lên cha
    };

    const handleCloseChangeTicketBox = () => {
        setIsChangeTicketBoxOpen(false);
        onChangeTicketBoxStateChange(false); // Gửi trạng thái lên cha
    };

    return (
        <div >
            <div className={styles.searchingTicketSpace}>
                <h2 style={{ textAlign: "center" }}>TRA CỨU VÉ XE</h2>
                <div className={styles.infoInputContainer}>
                    <div className={styles.inputTicketFill}>
                        <div className={styles.inputFillContainer}>
                            <p className='uiSemibold'>Số điện thoại</p>
                            <input type="text" className={styles.inputFill}></input>
                        </div>
                        <div className={styles.inputFillContainer}>
                            <p className='uiSemibold'>Mã vé</p>
                            <input
                                type="text"
                                className={styles.inputFill}
                                value={searchIdTicket}
                                onChange={(e) => setSearchIdTicket(e.target.value)}></input>
                        </div>
                    </div>
                    <button onClick={handleSearchButtonClick}><h4>Tra cứu</h4></button>
                </div>

            </div>
            <div className={styles.graMain}></div>

            {/* RESEARCH RESULT */}
            {isResultOpen && (<div className={styles.researchResultContainer} >
                <h3 style={{ marginTop: 50, textAlign: "center" }}>KẾT QUẢ TRUY XUẤT</h3>

                <div className={styles.resultList}>
                    {filteredRows.map((row, i) => {
                        return (
                            <div key={i} className={styles.resultItemContainer}>
                                <div className={styles.resultItem}>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Mã vé</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.id}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Số ghế</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.numberOfSeat}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Điểm đi</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.locationFrom}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Điểm đến</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.locationTo}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Thời gian khởi hành</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.dateTime}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Số xe</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.numberOfCar}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Biển số xe</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.idCar}</p>
                                    </div>
                                </div>
                                <div className={styles.buttonField}>
                                    {isEmployee && (
                                        <button style={{ background: '#2E6B75' }}
                                            onClick={handleOpenPrintBox}><p className='uiSemibold'>In vé</p></button>
                                    )}
                                    {isEmployee && (
                                        <button style={{ background: '#D7987D' }}
                                            onClick={handleOpenChangeTicketBox}><p className='uiSemibold'>Đổi vé</p></button>
                                    )}
                                    <button style={{ background: '#D24F4F' }}><p className='uiSemibold'>Hủy vé</p></button>
                                </div>
                                {(isPrintBoxOpen || isChangeTicketBoxOpen) && (
                                    <div className={styles.boxBackground}>
                                        {/* PRINT TICKET */}
                                        {isPrintBoxOpen && (
                                            <div className={styles.printBoxContainer}>
                                                <h3>
                                                    odau<span style={{ color: "#D7987D" }}>re</span>hon
                                                </h3>
                                                <div className={styles.printFlexBoxContainer}>
                                                    <div className={styles.inforSpaceContainer}>
                                                        <div className={styles.inforTicket}>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Mã vé: </h4>
                                                                <p className='p2'>{row.id}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Số ghế:</h4>
                                                                <p className='p2'>{row.numberOfSeat}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Chuyến xe:</h4>
                                                                <p className='p2'>{row.locationFrom} - {row.locationTo}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Giờ khởi hành:</h4>
                                                                <p className='p2'>{row.dateTime}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Số xe:</h4>
                                                                <p className='p2'>{row.numberOfCar}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Biển số xe:</h4>
                                                                <p className='p2'>{row.idCar}</p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className={styles.costTicket}>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Giá vé:</h4>
                                                                <p className='p2'>{row.cost}VND</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Giảm giá:</h4>
                                                                <p className='p2'>{row.percentDiscount}%</p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className={styles.totalCostTicket}>
                                                            <h4>Thành tiền: </h4>
                                                            <h3 style={{ color: "#D7987D" }}>{row.cost - (row.cost * row.percentDiscount) / 100}VND</h3>
                                                        </div>
                                                    </div>
                                                    <div className={styles.listOfBtnsContainer}>
                                                        <buton className={clsx("uiSemibold", styles.cancelButton)}
                                                            onClick={handleClosePrintBox}>Hủy</buton>
                                                        <button
                                                            className={clsx("uiSemibold", styles.printButton)}>In vé</button>
                                                    </div>
                                                </div>
                                            </div>)
                                        }

                                        {/* CHANGE TICKET */}
                                        {isChangeTicketBoxOpen && (
                                            <div className={styles.printBoxContainer}>
                                                <h3>
                                                    odau<span style={{ color: "#D7987D" }}>re</span>hon
                                                </h3>
                                                <div className={styles.printFlexBoxContainer}>
                                                    <div className={styles.inforSpaceContainer}>
                                                        <div className={styles.costTicket}>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Họ và tên:</h4>
                                                                <p className='p2'>Tên khách hàng</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Số điện thoại:</h4>
                                                                <p className='p2'>0123456789</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Email:</h4>
                                                                <p className='p2'>abc@gmail.com</p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className={styles.inforTicket}>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Mã vé: </h4>
                                                                <p className='p2'>{row.id}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Số ghế:</h4>
                                                                <p className='p2'>{row.numberOfSeat}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Chuyến xe:</h4>
                                                                <p className='p2'>{row.locationFrom} - {row.locationTo}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Giờ khởi hành:</h4>
                                                                <p className='p2'>{row.dateTime}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Số xe:</h4>
                                                                <p className='p2'>{row.numberOfCar}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Biển số xe:</h4>
                                                                <p className='p2'>{row.idCar}</p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className={styles.costTicket}>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Giá vé:</h4>
                                                                <p className='p2'>{row.cost}VND</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Giảm giá:</h4>
                                                                <p className='p2'>{row.percentDiscount}%</p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className={styles.totalCostTicket}>
                                                            <h4>Thành tiền: </h4>
                                                            <h3 style={{ color: "#D7987D" }}>{row.cost - (row.cost * row.percentDiscount) / 100}VND</h3>
                                                        </div>
                                                    </div>
                                                    <div className={styles.listOfBtnsContainer}>
                                                        <buton className={clsx("uiSemibold", styles.cancelButton)}
                                                            onClick={handleClosePrintBox}>Hủy</buton>
                                                        <button
                                                            className={clsx("uiSemibold", styles.printButton)}
                                                            onClick={() => nav("/employee/ChangeTicket")}>Đổi vé</button>
                                                    </div>
                                                </div>
                                            </div>)
                                        }

                                    </div>)}
                            </div>

                        )
                    })}
                </div>
            </div>)}


        </div>
    );
};

export default SearchingTicket;