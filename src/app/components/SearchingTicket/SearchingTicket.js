import React, { useState } from 'react';
import styles from './SearchingTicket.module.css'
import clsx from 'clsx';

function resultData(id, numberOfSeat, locationFrom, locationTo, dateTime, numberOfCar, idCar) {
    return { id, numberOfSeat, locationFrom, locationTo, dateTime, numberOfCar, idCar };
}

const rows = [
    resultData(1, 30, "Hà Nội", "Đà Nẵng", "2024-11-07 08:00", 101, "VN123"),
    resultData(2, 45, "Hồ Chí Minh", "Nha Trang", "2024-11-07 10:00", 102, "VN124"),
    resultData(3, 40, "Cần Thơ", "Đà Lạt", "2024-11-07 14:00", 103, "VN125"),
    resultData(4, 25, "Hải Phòng", "Quảng Ninh", "2024-11-07 09:00", 104, "VN126"),
    resultData(5, 35, "Đà Nẵng", "Huế", "2024-11-07 11:30", 105, "VN127"),
    resultData(6, 50, "Nha Trang", "Phú Yên", "2024-11-07 16:00", 106, "VN128"),
    resultData(7, 28, "Vũng Tàu", "Hồ Chí Minh", "2024-11-07 12:00", 107, "VN129"),
    resultData(8, 32, "Quảng Nam", "Đà Nẵng", "2024-11-07 17:00", 108, "VN130"),
    resultData(9, 40, "Bình Thuận", "Hồ Chí Minh", "2024-11-07 07:30", 109, "VN131"),
    resultData(10, 38, "Huế", "Quảng Trị", "2024-11-07 13:45", 110, "VN132")
];

const SearchingTicket = () => {
    const [searchIdTicket, setSearchIdTicket] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const [isResultOpen, setIsResultOpen] = useState(false);

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
                                    <button style={{ background: '#2E6B75' }}><p className='uiSemibold'>In vé</p></button>
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