import React, { useState } from 'react';
import styles from './ManagerAccount.module.css'
import { InlineIcon } from '@iconify/react'
import { Radio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AddAccount from './AddAccount';
import UpdateAccount from './UpdateAccount';


const columns = [
    { field: 'id', headerName: 'CCCD', width: 180 },
    { field: 'fullname', headerName: 'Họ và tên', width: 250 },
    { field: 'sex', headerName: 'Giới tính', width: 126 },
    { field: 'role', headerName: 'Chức vụ', width: 168 },
    { field: 'phone', type: 'numeber', headerName: 'Số điện thoại', width: 212 },
    { field: 'email', headerName: 'Email', width: 300 },
];

const rows = [

    {
        id: "123456789",
        fullname: "Nguyễn Văn A",
        sex: "Nam",
        role: "Nhân viên",
        phone: "0901234567",
        email: "nguyenvana@example.com"
    },

    {
        id: "987654321",
        fullname: "Trần Thị B",
        sex: "Nữ",
        role: "Khách hàng",
        phone: "0912345678",
        email: "tranthib@example.com"
    },

    {
        id: "456789123",
        fullname: "Lê Văn C",
        sex: "Nam",
        role: "Nhân viên",
        phone: "0923456789",
        email: "levanc@example.com"
    },

    {
        id: "654321987",
        fullname: "Phạm Thị D",
        sex: "Nữ",
        role: "Khách hàng",
        phone: "0934567890",
        email: "phamthid@example.com"
    },

    {
        id: "234567891",
        fullname: "Hoàng Văn E",
        sex: "Nam",
        role: "Nhân viên",
        phone: "0945678901",
        email: "hoangvane@example.com"
    },

    {
        id: "345678912",
        fullname: "Đặng Thị F",
        sex: "Nữ",
        role: "Khách hàng",
        phone: "0956789012",
        email: "dangthif@example.com"
    },

    {
        id: "456789213",
        fullname: "Ngô Văn G",
        sex: "Nam",
        role: "Nhân viên",
        phone: "0967890123",
        email: "ngovang@example.com"
    },

    {
        id: "567891234",
        fullname: "Đỗ Thị H",
        sex: "Nữ",
        role: "Khách hàng",
        phone: "0978901234",
        email: "dothih@example.com"
    },

    {
        id: "678912345",
        fullname: "Bùi Văn I",
        sex: "Nam",
        role: "Nhân viên",
        phone: "0989012345",
        email: "buivani@example.com"
    },

    {
        id: "789123456",
        fullname: "Phan Thị J",
        sex: "Nữ",
        role: "Khách hàng",
        phone: "0990123456",
        email: "phanthij@example.com"
    }
];

const paginationModel = { page: 0, pageSize: 10 };

const ManagerAccount = () => {
    const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
    const [isUpdateAccountOpen, setIsUpdateAccountOpen] = useState(false);

    const [selectedValue, setSelectedValue] = useState("all");

    const handleAddAccountButtonCLick = () => {
        setIsAddAccountOpen(true);
    }

    const handleCloseAddAccountButtonClick = () => {
        setIsAddAccountOpen(false);
    }

    const handleOpenUpdateAccountButtonClick = () => {
        setIsUpdateAccountOpen(true);
    }

    const handleCloseUpdateAccountButtonClick = () => {
        setIsUpdateAccountOpen(false);
    }

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <div className={styles.mainContainer}>
                <h2 className={styles.mainTopic}>QUẢN LÝ TÀI KHOẢN</h2>
                {/* SEARCHING SPACE */}
                <div className={styles.searchingSpaceContainer}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder='Nội dung tìm kiếm'></input>
                    <button className={styles.searchButton}>
                        <h4>Tìm kiếm</h4>
                    </button>
                </div>
                {/* GROUP OF TOOLS */}
                <div className={styles.toolsContainer}>
                    <div className={styles.fillContainer}>
                        <p className='uiSemibold' >Chức vụ</p>
                        <RadioGroup
                            row
                            sx={{
                                gap: "92px",
                                justifyContent: "center",
                            }}
                            name="rowRadioGroup"
                            value={selectedValue}
                            onChange={handleRadioChange}>
                            <FormControlLabel
                                value="all"
                                control={<Radio color="default" />}
                                label="Tất cả"
                            ></FormControlLabel>
                            <FormControlLabel
                                value="Customer"
                                control={<Radio color="default" />}
                                label="Khách hàng"
                            ></FormControlLabel>
                            <FormControlLabel
                                value="Employee"
                                control={<Radio color="default" />}
                                label="Nhân viên"
                            ></FormControlLabel>
                        </RadioGroup>

                    </div>
                    <div className={styles.toolsManagerContainer}>
                        <button className={styles.addButton}>
                            <InlineIcon className={styles.icon} icon="ic:round-add" onClick={handleAddAccountButtonCLick}></InlineIcon>
                        </button>
                        <button className={styles.deleteButton}>
                            <InlineIcon className={styles.icon} icon="pepicons-pop:line-x"></InlineIcon>
                        </button>
                        <button className={styles.updateButton}>
                            <InlineIcon className={styles.icon} icon="bxs:pencil" onClick={handleOpenUpdateAccountButtonClick}></InlineIcon>
                        </button>
                    </div>
                </div>

                <Paper sx={{ height: "646px", width: "fitContent", margin: "0 30px", marginTop: "67px", overflowY: "hidden" }}>
                    <DataGrid
                        rows={rows}
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
            {isAddAccountOpen && (
                <AddAccount isOpen={isAddAccountOpen} onClose={handleCloseAddAccountButtonClick}></AddAccount>
            )}

            {isUpdateAccountOpen && (
                <UpdateAccount isOpen={isUpdateAccountOpen} onClose={handleCloseUpdateAccountButtonClick}></UpdateAccount>
            )}

        </div>
    );

};

export default ManagerAccount;