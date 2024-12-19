import React, { useState } from 'react';
import styles from './ReportScreen.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function createData(fromLocation, toLocation, date, timeStart, totalTickets, ticketsPurchased, unitPrice) {
    const revenue = ticketsPurchased * unitPrice;
    return { fromLocation, toLocation, date, timeStart, totalTickets, ticketsPurchased, unitPrice, revenue };
}

const rows = [
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
    createData('Hà Nội', 'Đà Nẵng', '15/06/2022', '08:00', 100, 80, 15000),
];

const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0);

const ReportScreen = () => {

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
                            <input type="date" className={styles.inputTime}></input>
                        </div>
                        <div className={styles.inputLocationContainer}>
                            <p className='uiSemibold'>Đến ngày</p>
                            <input type="date" className={styles.inputTime}></input>
                        </div>
                        <button><p className='uiSemibold'>Tạo báo cáo</p></button>
                    </div>
                    <button className={styles.exportFileButton}><h5>Xuất file Excel</h5></button>
                </div>
                {/* REPORT TABLE */}
                <div className={styles.reportTableContainer}>
                    <TableContainer component={Paper} sx={{ width: 'fit-content', maxHeight: 400 }}>
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
                                {rows.map((row) => (
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