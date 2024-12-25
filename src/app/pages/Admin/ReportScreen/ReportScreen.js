import React, { useState } from 'react';
import styles from './ReportScreen.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function createData(fromLocation, toLocation, date, timeStart, totalTickets, ticketsPurchased, unitPrice) {
    const revenue = ticketsPurchased * unitPrice;
    return { fromLocation, toLocation, date, timeStart, totalTickets, ticketsPurchased, unitPrice, revenue };
}

const rows = [
    createData('Hà Nội', 'Đà Nẵng', '2024-12-25', '08:00', 100, 80, 15000),
    createData('Hồ Chí Minh', 'Nha Trang', '2024-12-20', '09:00', 120, 90, 20000),
    createData('Cần Thơ', 'Phú Quốc', '2024-12-24', '10:00', 150, 100, 30000),
    createData('Hà Nội', 'Hải Phòng', '2024-12-18', '07:30', 50, 40, 12000),
    createData('Hồ Chí Minh', 'Đà Lạt', '2024-12-19', '06:00', 200, 150, 25000),
    createData('Đà Nẵng', 'Huế', '2024-12-21', '05:00', 70, 60, 10000),
    createData('Cần Thơ', 'TP. HCM', '2024-12-22', '14:00', 100, 85, 18000),
    createData('Phú Quốc', 'Hà Tiên', '2024-12-23', '16:00', 60, 50, 15000),
    createData('Nha Trang', 'Hà Nội', '2024-12-17', '11:00', 90, 70, 18000),
    createData('Đà Lạt', 'Hồ Chí Minh', '2024-12-26', '12:30', 110, 95, 20000),
    createData('Huế', 'Đà Nẵng', '2024-12-27', '15:45', 80, 60, 17000),
    createData('TP. HCM', 'Cần Thơ', '2024-12-28', '13:15', 140, 130, 22000),
    createData('Hà Nội', 'Đà Nẵng', '2024-12-25', '08:00', 100, 80, 15000),
    createData('Hồ Chí Minh', 'Nha Trang', '2024-12-20', '09:00', 120, 90, 20000),
    createData('Cần Thơ', 'Phú Quốc', '2024-12-24', '10:00', 150, 100, 30000),
    createData('Hà Nội', 'Hải Phòng', '2024-12-18', '07:30', 50, 40, 12000),
    createData('Hồ Chí Minh', 'Đà Lạt', '2024-12-19', '06:00', 200, 150, 25000),
    createData('Đà Nẵng', 'Huế', '2024-12-21', '05:00', 70, 60, 10000),
    createData('Cần Thơ', 'TP. HCM', '2024-12-22', '14:00', 100, 85, 18000),
    createData('Phú Quốc', 'Hà Tiên', '2024-12-23', '16:00', 60, 50, 15000),
    createData('Nha Trang', 'Hà Nội', '2024-12-17', '11:00', 90, 70, 18000),
    createData('Đà Lạt', 'Hồ Chí Minh', '2024-12-26', '12:30', 110, 95, 20000),
    createData('Huế', 'Đà Nẵng', '2024-12-27', '15:45', 80, 60, 17000),
    createData('TP. HCM', 'Cần Thơ', '2024-12-28', '13:15', 140, 130, 22000),
];


const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0);

const ReportScreen = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filterRows, setFilterRows] = useState(rows);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }

    const handleFilter = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            const filteredData = rows.filter(row => {
                if (!row.date) return false; // Bỏ qua nếu `date` không tồn tại
                const departureDate = new Date(row.date.split('/').reverse().join('-')); // Định dạng ngày
                return departureDate >= start && departureDate <= end;
            });

            setFilterRows(filteredData);
        } else {
            alert("Vui lòng nhập đầy đủ 'Từ ngày' và 'Đến ngày'.")
        }
    }

    return (
        <div>
            <div className={styles.mainContainer}>
                <h2 style={{ textAlign: "center" }}>BÁO CÁO</h2>
                <button>
                    <InlineIcon icon="ic:round-arrow-back-ios" className={styles.icon}></InlineIcon>
                </button>
                {/* INPUT SELECTION */}
                <div className={styles.GenaralContainer}>
                    <div className={styles.inputSelectionContainer}>
                        <div className={styles.inputLocationContainer}>
                            <p className='uiSemibold'>Từ ngày</p>
                            <input
                                type="date"
                                className={styles.inputTime}
                                value={startDate}
                                onChange={handleStartDateChange}></input>
                        </div>
                        <div className={styles.inputLocationContainer}>
                            <p className='uiSemibold'>Đến ngày</p>
                            <input
                                type="date"
                                className={styles.inputTime}
                                value={endDate}
                                onChange={handleEndDateChange}></input>
                        </div>
                        <button onClick={handleFilter}><p className='uiSemibold'>Tạo báo cáo</p></button>
                        <button className={styles.exportFileButton}><h5>Xuất file Excel</h5></button>
                    </div>
                </div>
                {/* REPORT TABLE */}
                <div className={styles.reportTableContainer}>
                    <TableContainer component={Paper} sx={{ width: '80%', maxHeight: 800 }}>
                        <Table stickyHeader sx={{ minWidth: 650, width: 1380, justifyContent: 'center' }} aria-label='simple table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{}} align="left"><h6>Điểm đi</h6></TableCell>
                                    <TableCell sx={{}} align="left"><h6>Điểm đến</h6></TableCell>
                                    <TableCell sx={{}} align="right"><h6>Ngày khởi hành</h6></TableCell>
                                    <TableCell sx={{}} align="right"><h6>Giờ xuất phát</h6></TableCell>
                                    <TableCell sx={{}} align="right"><h6>Tổng số vé</h6></TableCell>
                                    <TableCell sx={{}} align="right"><h6>Số vé bán được</h6></TableCell>
                                    <TableCell sx={{}} align="right"><h6>Đơn giá</h6></TableCell>
                                    <TableCell sx={{}} align="right"><h6>Doanh thu</h6></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filterRows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { boder: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.fromLocation}
                                        </TableCell>
                                        <TableCell align="left">{row.toLocation}</TableCell>
                                        <TableCell align="right">{row.date}</TableCell>
                                        <TableCell align="right">{row.timeStart}</TableCell>
                                        <TableCell align="right">{row.totalTickets}</TableCell>
                                        <TableCell align="right">{row.ticketsPurchased}</TableCell>
                                        <TableCell align="right">{row.unitPrice}</TableCell>
                                        <TableCell align="right">{row.revenue}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                {/* SUM OF REVENUE */}
                <h4
                    style={{ marginTop: 25, marginRight: 30, textAlign: 'right' }}>
                    Tổng doanh thu: {totalRevenue}</h4>

            </div>
        </div>
    );
};

export default ReportScreen;