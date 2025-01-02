import React, { useContext, useState } from 'react';
import styles from "./BuyTicket.module.css";
import { Navigate } from 'react-router-dom';
import { TicketContext } from '../../modules/TicketContext';
import axios from 'axios';
import ChooseRound from './ChooseRound';

function resultData(id, locationFrom, timeStart, locationTo, timeEnd, timeDuring, dateTime, freeSeat, cost) {
    const startDateTime = new Date(`${dateTime}T${timeStart}`);
    const endDateTime = new Date(`${dateTime}T${timeEnd}`);
    timeDuring = Math.abs(endDateTime - startDateTime) / (1000 * 60);
    return { id, locationFrom, timeStart, locationTo, timeEnd, timeDuring, dateTime, freeSeat, cost }
}

const rows = [
    // Outbound trips
    resultData(1, 'Hà Nội', '08:00', 'Thành phố Hồ Chí Minh', '16:00', 0, '2024-12-05', 30, 500000),
    resultData(2, 'Đà Nẵng', '09:00', 'Huế', '12:00', 0, '2024-12-05', 20, 200000),
    resultData(3, 'Nha Trang', '14:00', 'Đà Lạt', '18:00', 0, '2024-12-06', 25, 300000),
    resultData(4, 'Vũng Tàu', '07:00', 'Cần Thơ', '13:00', 0, '2024-12-06', 15, 450000),
    resultData(5, 'Hải Phòng', '10:00', 'Nam Định', '13:30', 0, '2024-12-07', 18, 250000),
    resultData(6, 'Quảng Ninh', '06:00', 'Lào Cai', '14:00', 0, '2024-12-07', 12, 600000),
    resultData(7, 'Bắc Giang', '15:00', 'Phú Thọ', '17:30', 0, '2024-12-08', 28, 150000),
    resultData(8, 'Hà Nội', '11:00', 'Hải Dương', '13:00', 0, '2024-12-08', 22, 200000),
    resultData(9, 'Đồng Nai', '09:00', 'Tây Ninh', '12:00', 0, '2024-12-09', 30, 350000),
    resultData(10, 'Cần Thơ', '13:00', 'Sóc Trăng', '15:00', 0, '2024-12-09', 10, 100000),

    // Return trips
    resultData(11, 'Thành phố Hồ Chí Minh', '10:00', 'Hà Nội', '18:00', 0, '2024-12-06', 25, 500000),
    resultData(12, 'Huế', '13:00', 'Đà Nẵng', '16:00', 0, '2024-12-05', 15, 200000),
    resultData(13, 'Đà Lạt', '09:00', 'Nha Trang', '13:00', 0, '2024-12-06', 20, 300000),
    resultData(14, 'Cần Thơ', '14:00', 'Vũng Tàu', '20:00', 0, '2024-12-06', 10, 450000),
    resultData(15, 'Nam Định', '08:00', 'Hải Phòng', '11:30', 0, '2024-12-07', 18, 250000),
    resultData(16, 'Lào Cai', '15:00', 'Quảng Ninh', '23:00', 0, '2024-12-07', 12, 600000),
    resultData(17, 'Phú Thọ', '18:00', 'Bắc Giang', '20:30', 0, '2024-12-08', 28, 150000),
    resultData(18, 'Hải Dương', '14:00', 'Hà Nội', '16:00', 0, '2024-12-08', 22, 200000),
    resultData(19, 'Tây Ninh', '13:00', 'Đồng Nai', '16:00', 0, '2024-12-09', 30, 350000),
    resultData(20, 'Sóc Trăng', '16:00', 'Cần Thơ', '18:00', 0, '2024-12-09', 10, 100000),
];

function capitalizeWords(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa ký tự đầu, giữ nguyên phần còn lại
        .join(' ');
}

function normalizeString(str) {
    return str
        .normalize('NFD') // Tách chữ và dấu
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
        .toLowerCase() // Chuyển về chữ thường
        .replace(/\s+/g, ''); // Loại bỏ khoảng trắng
}


const BuyTicket = () => {
    const { isRoundTrip, toggleRoundTrip } = useContext(TicketContext);
    const [searchLoactionFrom, setSearchLoactionFrom] = useState('');
    const [searchLoactionTo, setSearchLoactionTo] = useState('');
    const [searchDateTimeFrom, setSearchDateTimeFrom] = useState('');
    const [searchDateTimeTo, setSearchDateTimeTo] = useState('');
    const [searchFreeSeat, setSearchFreeSeat] = useState('');
    const [selectedTrip, setSelectedTrip] = useState('Chuyến đi');

    const [filteredRowsOutbound, setFilteredRowsOutbound] = useState(rows);
    const [filteredRowsReturn, setFilteredRowsReturn] = useState(rows);
    const [isResultOpen, setIsResultOpen] = useState(false);
    const [locationFromTo, setLocationFromTo] = useState('');

    const [noResultsOutboundFound, setNoResultsOutboundFound] = useState(false);
    const [noResultsReturnFound, setNoResultsReturnFound] = useState(false);

    const handleSearchOutbound = () => {

        const outboundResults = rows.filter(row => {
            return (
                normalizeString(row.locationFrom).includes(normalizeString(searchLoactionFrom)) &&
                normalizeString(row.locationTo).includes(normalizeString(searchLoactionTo)) &&
                new Date(row.dateTime).toISOString().slice(0, 10) === new Date(searchDateTimeFrom).toISOString().slice(0, 10) &&
                row.freeSeat >= searchFreeSeat
            );
        });

        if (outboundResults.length === 0) {
            setNoResultsOutboundFound(true);
        } else {
            setLocationFromTo(capitalizeWords(`${searchLoactionFrom} - ${searchLoactionTo}`));
            setNoResultsOutboundFound(false);
            setFilteredRowsOutbound(outboundResults);

        }
        setIsResultOpen(true);
    };

    const handleSearchReturn = () => {
        const returnResults = rows.filter(row => {
            return (
                normalizeString(row.locationFrom).includes(normalizeString(searchLoactionTo)) &&
                normalizeString(row.locationTo).includes(normalizeString(searchLoactionFrom)) &&
                new Date(row.dateTime).toISOString().slice(0, 10) === new Date(searchDateTimeTo).toISOString().slice(0, 10) &&
                row.freeSeat >= searchFreeSeat
            );
        });

        if (returnResults.length === 0) {
            setNoResultsReturnFound(true);
        } else {
            setNoResultsReturnFound(false);
            setFilteredRowsReturn(returnResults);
            setLocationFromTo(capitalizeWords(`${searchLoactionTo} - ${searchLoactionFrom}`));
        }
        setIsResultOpen(true);
    };




    const handleTripSelected = (trip) => {
        setSelectedTrip(trip);
    };
    const handleSearchButtonClick = async () => {
        if (isRoundTrip) {
            if (!searchLoactionFrom || !searchLoactionTo || !searchDateTimeFrom || !searchDateTimeTo || !searchFreeSeat) {
                alert('Vui lòng nhập đủ thông tin tìm kiếm');
                return;
            }
            try {
                // Tìm kiếm outbound (chuyến đi)
                const outboundResponse = await axios.get('http://localhost:5278/api/bookticket/search', {
                    params: {
                        departPlace: searchLoactionFrom,
                        arrivalPlace: searchLoactionTo,
                        departureDate: searchDateTimeFrom,
                        ticketCount: searchFreeSeat,
                    }
                });
                
                if (outboundResponse.data.length === 0) {
                    setNoResultsOutboundFound(true);
                } else {
                    setNoResultsOutboundFound(false);
                    setFilteredRowsOutbound(outboundResponse.data);
                }

                // Tìm kiếm return (chuyến về)
                const returnResponse = await axios.get('http://localhost:5278/api/bookticket/search', {
                    params: {
                        departPlace: searchLoactionTo,
                        arrivalPlace: searchLoactionFrom,
                        departureDate: searchDateTimeTo,
                        ticketCount: searchFreeSeat,
                    }
                });
                
                if (returnResponse.data.length === 0) {
                    setNoResultsReturnFound(true);
                } else {
                    setNoResultsReturnFound(false);
                    setFilteredRowsReturn(returnResponse.data);
                }
                
                setIsResultOpen(true);
            } catch (error) {
                alert('Đã có lỗi xảy ra khi gọi API');
            }
        } else {
            // Tìm kiếm cho chuyến đi một chiều
            if (!searchLoactionFrom || !searchLoactionTo || !searchDateTimeFrom || !searchFreeSeat) {
                alert('Vui lòng nhập đủ thông tin tìm kiếm');
                return;
            }
            try {
                const response = await axios.get('http://localhost:5278/api/bookticket/search', {
                    params: {
                        departPlace: searchLoactionFrom,
                        arrivalPlace: searchLoactionTo,
                        departureDate: searchDateTimeFrom,
                        ticketCount: searchFreeSeat,
                    }
                });
console.log(response.data);
                if (response.data.length === 0) {
                    setNoResultsOutboundFound(true);
                } else {
                    setNoResultsOutboundFound(false);
                    setFilteredRowsOutbound(response.data);
                }
                
                setIsResultOpen(true);
            } catch (error) {
                alert('Đã có lỗi xảy ra khi gọi API');
            }
        }
    };
    return (
        <div>
            <div>
                <div className={styles.fillInputSpace}>
                    {/* SWITCH */}
                    <div className={styles.switchRoundTrip}>
                        <p className='uiSemibold'>Khứ hồi</p>
                        <div onClick={toggleRoundTrip} style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    display: 'inline-block',
                                    width: '60px',
                                    height: '30px',
                                    borderRadius: '30px',
                                    backgroundColor: isRoundTrip ? '#D7987D' : 'grey',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                            >
                                <div
                                    style={{
                                        width: '26px',
                                        height: '26px',
                                        borderRadius: '50%',
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        top: '2px',
                                        left: isRoundTrip ? '32px' : '2px',
                                        transition: 'left 0.3s',
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.fillSearchRoundInfor}>
                        <div className={styles.itemInforBasic}>
                            <p className='uiSemibold'>Điểm đi</p>
                            <input
                                type='text'
                                className={styles.inputBasic}
                                value={searchLoactionFrom}
                                onChange={(e) => setSearchLoactionFrom(e.target.value)}></input>

                        </div>
                        <div className={styles.itemInforBasic}>
                            <p className='uiSemibold'>Điểm đến</p>
                            <input
                                type='text'
                                className={styles.inputBasic}
                                value={searchLoactionTo}
                                onChange={(e) => setSearchLoactionTo(e.target.value)}></input>
                        </div>
                        <div className={styles.itemInforBasic}>
                            <p className='uiSemibold'>Ngày đi</p>
                            <input
                                type='date'
                                className={styles.inputBasic}
                                value={searchDateTimeFrom}
                                onChange={(e) => setSearchDateTimeFrom(e.target.value)}></input>
                        </div>
                        <div
                            className={styles.itemInforBasic}
                            style={{
                                display: isRoundTrip ? 'block' : 'none',
                            }}>
                            <p className='uiSemibold'>Ngày về</p>
                            <input
                                type='date'
                                className={styles.inputBasic}
                                value={searchDateTimeTo}
                                onChange={(e) => setSearchDateTimeTo(e.target.value)}></input>
                        </div>
                        <div className={styles.itemInforBasic}>
                            <p className='uiSemibold'>Số vé</p>
                            <input
                                type='number'
                                className={styles.inputBasic}
                                value={searchFreeSeat}
                                onChange={(e) => setSearchFreeSeat(e.target.value)}></input>
                        </div>
                    </div>

                    <button onClick={handleSearchButtonClick}>
                        <h4>Tìm chuyến xe</h4>
                    </button>
                </div>
            </div>

            {/* SEARCHING RESULT */}
            {isResultOpen && (<div className={styles.resutlContainer}>
                <div className={styles.filterSpace}>
                    <div className={styles.flexBoxContainer}>
                        <h4>Lọc</h4>
                        <div className={styles.filterItem}>
                            <p className='uiSemibold'>Khung thời gian</p>
                            <div className={styles.filterCheckBoxList}>
                                <div className={styles.itemCheckBox}>
                                    <input
                                        type='checkbox'
                                        className={styles.checkboxInput}></input>
                                    <label className='p3'>00:00 - 06:00</label>
                                </div>
                                <div className={styles.itemCheckBox}>
                                    <input
                                        type='checkbox'
                                        className={styles.checkboxInput}></input>
                                    <label className='p3'>06:00 - 12:00</label>
                                </div>
                                <div className={styles.itemCheckBox}>
                                    <input
                                        type='checkbox'
                                        className={styles.checkboxInput}></input>
                                    <label className='p3'>12:00 - 18:00</label>
                                </div>
                                <div className={styles.itemCheckBox}>
                                    <input
                                        type='checkbox'
                                        className={styles.checkboxInput}></input>
                                    <label className='p3'>18:00 - 00:00</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.resultSpace}>
                    {isRoundTrip ? (<div style={{ display: "flex", justifyContent: "space-between", width: 946 }}>
                        <h4>{locationFromTo}</h4>
                        <div className={styles.radioButtons}>
                            <label className='uiSemibold'>
                                <input
                                    type='radio'
                                    name='tripType'
                                    value='Chuyến đi'
                                    checked={selectedTrip === 'Chuyến đi'}
                                    onChange={() => handleTripSelected('Chuyến đi')}
                                />
                                Chuyến đi
                            </label>
                            <label className='uiSemibold'>
                                <input
                                    type='radio'
                                    name='tripType'
                                    value='Chuyến về'
                                    checked={selectedTrip === 'Chuyến về'}
                                    onChange={() => handleTripSelected('Chuyến về')}
                                />
                                Chuyến về
                            </label>
                        </div>
                    </div>) : (<h4>{locationFromTo}</h4>)}

                    <div className={styles.flexBoxContainer}>
                        {isRoundTrip ? (
                            <>
                                {selectedTrip === "Chuyến đi" ? (
                                    noResultsOutboundFound ? (
                                        <p className="p2">Không tìm thấy kết quả cho chuyến đi</p>
                                    ) : (
                                        <ChooseRound rows={filteredRowsOutbound} isRoundTrip />
                                    )
                                ) : selectedTrip === "Chuyến về" ? (
                                    noResultsReturnFound ? (
                                        <p className="p2">Không tìm thấy kết quả cho chuyến về</p>
                                    ) : (
                                        <ChooseRound rows={filteredRowsReturn} isRoundTrip />
                                    )
                                ) : null}
                            </>
                        ) : (
                            noResultsOutboundFound ? (
                                <p className="p2">Không tìm thấy kết quả cho chuyến đi</p>
                            ) : (
                                <ChooseRound rows={filteredRowsOutbound} isRoundTrip={() => true} />
                            )
                        )}
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default BuyTicket;