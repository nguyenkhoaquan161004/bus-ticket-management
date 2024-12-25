import React, { useState } from 'react';
import styles from './RouteSearching.module.css';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AddRoute from './AddRoute';
import UpdateRoute from './UpdateRoute';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'startLocation', headerName: 'Điểm đi', width: 200 },
    { field: 'endLocation', headerName: 'Điểm đến', width: 200 },
    { field: 'departureDate', headerName: 'Ngày đi', width: 168 },
    { field: 'time', type: 'time', headerName: 'Giờ khởi hành', width: 168 }
];

let nextId = 1;

const rows = [];

function addRoute(startLocation, endLocation, departureDate, time) {
    const newRoute = {
        id: nextId++,
        startLocation,
        endLocation,
        departureDate,
        time,
    };
    rows.push(newRoute);
}

addRoute('Hà Nội', 'Đà Nẵng', '2024-11-07', '08:00');
addRoute('Hồ Chí Minh', 'Nha Trang', '2024-11-07', '10:00');
addRoute('Cần Thơ', 'Đà Lạt', '2024-11-07', '14:00');
addRoute('Hải Phòng', 'Quảng Ninh', '2024-11-08', '09:00');
addRoute('Đà Nẵng', 'Huế', '2024-11-08', '11:30');
addRoute('Nha Trang', 'Phú Yên', '2024-11-09', '16:00');
addRoute('Vũng Tàu', 'Hồ Chí Minh', '2024-11-09', '12:00');
addRoute('Quảng Nam', 'Đà Nẵng', '2024-11-10', '17:00');
addRoute('Bình Thuận', 'Hồ Chí Minh', '2024-11-10', '07:30');
addRoute('Huế', 'Quảng Trị', '2024-11-11', '13:45');

const paginationModel = { page: 0, pageSize: 10 };

const RouteSearching = () => {
    const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
    const [isUpdateRouteOpen, setIsUpdateRouteOpen] = useState(false);

    const [startLoction, setStartLoaction] = useState('');
    const [endLoction, setEndLoction] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [fillteredRows, setFilteredRows] = useState(rows);

    const handleAddRouteButtonCLick = () => {
        setIsAddRouteOpen(true);
    }

    const handleCloseAddRouteButtonClick = () => {
        setIsAddRouteOpen(false);
    }

    const handleOpenUpdateRouteButtonClick = () => {
        setIsUpdateRouteOpen(true);
    }

    const handleCloseUpdateRouteButtonClick = () => {
        setIsUpdateRouteOpen(false);
    }

    const handleSearching = () => {
        const filteredData = rows.filter(row => {
            return (
                (!startLoction || (row.startLocation && row.startLocation.includes(startLoction))) &&
                (!endLoction || (row.endLocation && row.endLocation.includes(endLoction))) &&
                (!departureDate || row.departureDate === departureDate)
            );
        });
        setFilteredRows(filteredData);
    };

    return (
        <div>
            <div className={styles.mainContainer}>
                <h1 style={{ textAlign: "center" }}>TUYẾN TRÌNH</h1>
                <button className={styles.buttonBack}>
                    <InlineIcon icon="ic:round-arrow-back-ios" className={styles.icon}></InlineIcon>
                </button>
                {/* INPUT SELECTION */}
                <div className={styles.genaralContainer}>
                    <div className={styles.inputSelectionContainer}>
                        <div className={styles.inputLocationContainer}>
                            <p className='uiSemibold'>Điểm đi</p>
                            <input
                                type="text"
                                className={styles.inputLocation}
                                value={startLoction}
                                onChange={(e) => setStartLoaction(e.target.value)}></input>
                        </div>
                        <div className={styles.inputLocationContainer}>
                            <p className='uiSemibold'>Điểm đến</p>
                            <input
                                type="text"
                                className={styles.inputLocation}
                                value={endLoction}
                                onChange={(e) => setEndLoction(e.target.value)}></input>
                        </div>
                        <div className={styles.inputLocationContainer}>
                            <p className='uiSemibold'>Ngày đi</p>
                            <input
                                type="date"
                                className={styles.inputTime}
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}></input>
                        </div>
                        <button
                            style={{ border: 'none' }}
                            onClick={handleSearching}><p className='uiSemibold'>Tìm kiếm</p></button>
                    </div>
                    <div className={styles.toolsManagerContainer}>
                        <button className={styles.addButotn}>
                            <InlineIcon className={styles.icon} icon="ic:round-add" onClick={handleAddRouteButtonCLick}></InlineIcon>
                        </button>
                        <button className={styles.deleteButotn}>
                            <InlineIcon className={styles.icon} icon="pepicons-pop:line-x"></InlineIcon>
                        </button>
                        <button className={styles.updateButotn}>
                            <InlineIcon className={styles.icon} icon="bxs:pencil" onClick={handleOpenUpdateRouteButtonClick}></InlineIcon>
                        </button>
                    </div>
                </div>

                <div className={styles.routeSearchingContainer} >
                    <div className={styles.sortSpace}>
                        <p className='uiSemibold'>Khung thời gian</p>
                        <FormControl component="fieldset">
                            <FormGroup aria-label='position' column>
                                <FormControlLabel
                                    value="end"
                                    control={<Checkbox />}
                                    label={
                                        <Typography
                                            sx={{ fontFamily: 'Open Sans', fontSize: 20 }}
                                        >0:00 - 6:00</Typography>}
                                    labelPlacement="end"
                                    fontFamily="Open Sans"
                                />
                                <FormControlLabel
                                    value="end"
                                    control={<Checkbox />}
                                    label={
                                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: 20 }}
                                        >6:00 - 12:00</Typography>}
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="end"
                                    control={<Checkbox />}
                                    label={
                                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: 20 }}
                                        >12:00 - 18:00</Typography>}
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="end"
                                    control={<Checkbox />}
                                    label={
                                        <Typography sx={{ fontFamily: 'Open Sans', fontSize: 20 }}
                                        >18:00 - 24:00</Typography>}
                                    labelPlacement="end"
                                />
                            </FormGroup>
                        </FormControl>
                    </div>

                    <div className={styles.resultSpaceContainer}>
                        <Paper sx={{ height: "646px", width: 890, margin: "0 30px", overflowY: "hidden" }}>
                            <DataGrid
                                rows={fillteredRows}
                                columns={columns}
                                initialState={{ pagination: { paginationModel } }}
                                pageSizeOptions={[10, 20]}
                                checkboxSelection
                                sx={{
                                    border: 0,
                                    "& .MuiDataGrid-columnHeaders": {
                                        fontStyle: 'normal',
                                        fontWeight: 800,
                                        fontSize: '18px',
                                        lineHeight: '110%'
                                    },
                                    "& .MuiDataGrid-row.Mui-selected ": {
                                        background: "#F9DED4",
                                    },
                                    "& .MuiCheckbox-root.Mui-checked": {
                                        color: "#D7987D"
                                    }
                                }}
                            />
                        </Paper>
                    </div>
                </div>
            </div>
            <AddRoute
                isOpen={isAddRouteOpen}
                onClose={handleCloseAddRouteButtonClick}></AddRoute>
            <UpdateRoute
                isOpen={isUpdateRouteOpen}
                onClose={handleCloseUpdateRouteButtonClick}></UpdateRoute>
        </div>
    );
};

export default RouteSearching;