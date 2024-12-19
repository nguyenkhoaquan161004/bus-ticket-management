import React, { useContext, useState } from 'react';
import styles from './SearchingTicket.module.css'
import clsx from 'clsx';
import { EmployeeContext } from '../../modules/EmployeeContext';
import rows from '../../assets/TicketInformations';

const SearchingTicket = () => {
    const [searchIdTicket, setSearchIdTicket] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const [isResultOpen, setIsResultOpen] = useState(false);
    const { isEmployee } = useContext(EmployeeContext);

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

    return (
        <div>
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
                                        <button style={{ background: '#2E6B75' }}><p className='uiSemibold'>In vé</p></button>
                                    )}
                                    {isEmployee && (
                                        <button style={{ background: '#D7987D' }}><p className='uiSemibold'>Đổi vé</p></button>
                                    )}
                                    <button style={{ background: '#D24F4F' }}><p className='uiSemibold'>Hủy vé</p></button>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>)}

        </div>
    );
};

export default SearchingTicket;