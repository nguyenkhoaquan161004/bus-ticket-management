import React, { useState, useEffect } from 'react';
import styles from './ReportScreen.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from "axios";
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
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
      id: "",
      departure: "",
      destination: "",
      date: "",
    });
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    }

    const handleFilter = () => {
        
            fetchBusRoutes();

       
    }
    const fetchBusRoutes = async () => {
        try {
          const params = {
            id: searchQuery.id,
            departure: searchQuery.departure,
            destination: searchQuery.destination,
            date: searchQuery.date,
          };
      
          const response = await axios.get(
            "http://localhost:5278/api/busroute/bus-route-report",
            { params } 
          );
      
          setResults(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching bus routes:", error);
        }
      };
      
      useEffect(() => {
        fetchBusRoutes(); 
      }, []);
      const calculateTotalRevenue = () => {
        return results.reduce((sum, route) => sum + route.totalRevenue, 0);
      };
      const handleExport = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5278/api/busroute/bus-route-report-export",
            {
              params: searchQuery, 
              responseType: "blob", 
            }
          );
      
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "BusRouteReport.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error("Error exporting file:", error);
        }
      };
      
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
                            <input
                               placeholder="Tìm theo mã tuyến"
                                className={styles.inputTime}
                              
                                onChange={(e) =>
                                    setSearchQuery((prev) => ({ ...prev, id: e.target.value }))
                                  }></input>
                        </div>
                        <div className={styles.inputLocationContainer}>
                            <input
                                 placeholder="Điểm đi"
                                  className={styles.inputTime}
                                onChange={(e) =>
                                    setSearchQuery((prev) => ({ ...prev, departure: e.target.value }))
                                  }></input>
                        </div>
                        <div className={styles.inputLocationContainer}>
                            <input
                                 placeholder="Điểm đến"
                                 className={styles.inputTime}
                                onChange={(e) =>
                                    setSearchQuery((prev) => ({ ...prev, destination: e.target.value }))
                                  }></input>
                        </div>
                        <div className={styles.inputLocationContainer}>
                            <input
                                type="date"
                                placeholder="Ngày"
                                className={styles.inputTime}
                                onChange={(e) =>
                                    setSearchQuery((prev) => ({ ...prev, date: e.target.value }))
                                  }></input>
                        </div>
                        <button onClick={handleFilter}><p className='uiSemibold'>Tạo báo cáo</p></button>
                        <button className={styles.exportFileButton} onClick={handleExport}><h5>Xuất file Excel</h5></button>
                    </div>
                </div>
              {/* REPORT TABLE */}
                <div className={styles.reportTableContainer}>
                    <TableContainer component={Paper} sx={{ width: '90%', maxHeight: 800 }}>
                        <Table stickyHeader sx={{ minWidth: 850 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: '22px' }} align="left"><h6>Mã tuyến</h6></TableCell>
                                    <TableCell sx={{ fontSize: '22px' }} align="left"><h6>Thời gian khởi hành</h6></TableCell>
                                    <TableCell sx={{ fontSize: '22px' }} align="left"><h6>Điểm đi</h6></TableCell>
                                    <TableCell sx={{ fontSize: '22px' }} align="left"><h6>Điểm đến</h6></TableCell>
                                    <TableCell sx={{ fontSize: '22px' }} align="left"><h6>Các bus đang vận hành</h6></TableCell>
                                    <TableCell sx={{ fontSize: '22px' }} align="left"><h6>Tổng số vé</h6></TableCell>
                                    <TableCell sx={{ fontSize: '22px' }} align="left"><h6>Số vé bán được</h6></TableCell>
                                    <TableCell sx={{ fontSize: '22px' }} align="left"><h6>Doanh thu</h6></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {results.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{row.busRouteId}</TableCell>
                                        <TableCell align="left">{row.departureTime}</TableCell>
                                        <TableCell align="left">{row.departure}</TableCell>
                                        <TableCell align="left">{row.destination}</TableCell>
                                        <TableCell align="center">{row.busIds}</TableCell>
                                        <TableCell align="center">{row.totalTickets}</TableCell>
                                        <TableCell align="center">{row.soldTickets}</TableCell>
                                        <TableCell align="left">{row.totalRevenue.toLocaleString()} VNĐ</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                {/* SUM OF REVENUE */}
                <h4
                    style={{ marginTop: 25, marginRight: 30, textAlign: 'right' }}>
                    Tổng doanh thu: {calculateTotalRevenue().toLocaleString()} VNĐ</h4>

            </div>
        </div>
    );
};

export default ReportScreen;