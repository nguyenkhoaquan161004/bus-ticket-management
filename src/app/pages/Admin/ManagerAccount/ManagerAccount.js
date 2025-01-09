import React, { useState } from "react";
import styles from "./ManagerAccount.module.css";
import { InlineIcon } from "@iconify/react";
import { Radio } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AddAccount from "./AddAccount";
import UpdateAccount from "./UpdateAccount";
import rows from "../../../assets/AccountInfor";
import axios from "axios";
import { useEffect } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 180 },
  { field: "fullname", headerName: "Họ và tên", width: 250 },
  { field: "sex", headerName: "Giới tính", width: 126 },
  { field: "role", headerName: "Chức vụ", width: 168 },
  { field: "phone", type: "number", headerName: "Số điện thoại", width: 212 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "password", type: "numeber", headerName: "Mật khẩu", width: 212 },
  { field: "status", headerName: "Trạng thái", width: 160 },
  { field: "note", headerName: "Ghi chú", width: 232 },
];

const paginationModel = { page: 0, pageSize: 10 };

const ManagerAccount = () => {
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isUpdateAccountOpen, setIsUpdateAccountOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("all");
  const [accounts, setAccounts] = useState([]);
  const [fillteredRows, setFilteredRows] = useState(rows);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("http://localhost:5278/api/Account/");
        const accountsWithId = response.data.map((account) => ({
          id: account.accountID,
          fullname: account.name,
          role: account.userType,
          phone: account.phoneNumber,
          email: account.userName,
          password: account.password,
          status: account.status,
          hireDate: account.hireDate,
          sex: account.gender,
        }));
        setAccounts(accountsWithId);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleAddAccountButtonCLick = () => {
    setIsAddAccountOpen(true);
  };

  const handleCloseAddAccountButtonClick = () => {
    setIsAddAccountOpen(false);
  };

  const handleOpenUpdateAccountButtonClick = () => {
    if (!selectedRowId) {
      alert("Vui lòng chọn một tài khoản để cập nhật.");
      return;
    }
    setIsUpdateAccountOpen(true);
  };

  const handleCloseUpdateAccountButtonClick = () => {
    setIsUpdateAccountOpen(false);
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    if (value === "all") {
      // Hiển thị tất cả các tài khoản
      setFilteredRows(accounts);
    } else if (value === "Customer") {
      // Lọc danh sách để chỉ hiển thị "Khách hàng"
      setFilteredRows(
        accounts.filter(
          (row) => row.role === "Customer" || row.role === "Khách Hàng"
        )
      );
    } else if (value === "Employee") {
      // Lọc danh sách để chỉ hiển thị "Nhân viên"
      setFilteredRows(
        accounts.filter(
          (row) => row.role != "Customer" && row.role != "Khách Hàng"
        )
      );
    }
  };

  const addNewAccount = (newAccount) => {
    const accountsWithId = {
      id: newAccount.accountID,
      fullname: newAccount.name,
      role: newAccount.userType,
      phone: newAccount.phoneNumber,
      email: newAccount.userName,
      password: newAccount.password,
      status: newAccount.status,
      hireDate: newAccount.hireDate,
      sex: newAccount.gender,
    };

    setFilteredRows((prevRows) => [...prevRows, accountsWithId]);
    alert("Tài khoản mới được thêm thành công.");
  };

  const handleSelectionChange = (selection) => {
    if (selection.length === 1) {
      const selectedRow = fillteredRows.find((row) => row.id === selection[0]);
      setSelectedRowId(selectedRow);
    } else {
      setSelectedRowId(null);
    }

    setSelectedRowIds(selection);
  };

  const updateAccount = (
    updateFullName,
    updateSex,
    updatePhone,
    updateEmail,
    updatePassword,
    updateStatus,
    updateNote
  ) => {
    setFilteredRows((prevRows) =>
      prevRows.map((row) =>
        row.id === selectedRowId.id
          ? {
              ...row,
              fullname: updateFullName,
              sex: updateSex,
              phone: updatePhone,
              email: updateEmail,
              password: updatePassword,
              status: updateStatus,
              note: updateNote,
            }
          : row
      )
    );
    alert("Cập nhật tài khoản thành công.");
  };

  const handleDeleteAccount = async () => {
    if (selectedRowIds.length === 0) {
      alert("Vui lòng chọn ít nhất một tài khoản để xóa.");
      return;
    }

    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa tài khoản này không?"
    );
    if (isConfirmed) {
      try {
        await Promise.all(
          selectedRowIds.map(async (id) => {
            await axios.delete(`http://localhost:5278/api/Account/${id}`);
          })
        );

        setFilteredRows((prevRows) =>
          prevRows.filter((row) => !selectedRowIds.includes(row.id))
        );
        setSelectedRowIds([]);
        alert("Tài khoản đã xóa thành công.");
      } catch (error) {
        console.error("Error deleting accounts:", error);
        alert("Đã xảy ra lỗi khi xóa tài khoản.");
      }
    }
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
            placeholder="Nội dung tìm kiếm"
          ></input>
          <button className={styles.searchButton}>
            <h4>Tìm kiếm</h4>
          </button>
        </div>
        {/* GROUP OF TOOLS */}
        <div className={styles.toolsContainer}>
          <div className={styles.fillContainer}>
            <p className="uiSemibold">Chức vụ</p>
            <RadioGroup
              row
              sx={{
                gap: "92px",
                justifyContent: "center",
              }}
              name="rowRadioGroup"
              value={selectedValue}
              onChange={handleRadioChange}
            >
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
              <InlineIcon
                className={styles.icon}
                icon="ic:round-add"
                onClick={handleAddAccountButtonCLick}
              ></InlineIcon>
            </button>
            <button className={styles.deleteButton}>
              <InlineIcon
                className={styles.icon}
                icon="pepicons-pop:line-x"
                onClick={handleDeleteAccount}
              ></InlineIcon>
            </button>
            <button className={styles.updateButton}>
              <InlineIcon
                className={styles.icon}
                icon="bxs:pencil"
                onClick={handleOpenUpdateAccountButtonClick}
              ></InlineIcon>
            </button>
          </div>
        </div>

        <Paper
          sx={{
            height: "646px",
            width: "fitContent",
            margin: "0 30px",
            marginTop: "67px",
            overflowY: "hidden",
          }}
        >
          <DataGrid
            rows={fillteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
            onRowSelectionModelChange={handleSelectionChange}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                fontStyle: "normal",
                fontWeight: 800,
                fontSize: "18px",
                lineHeight: "110%",
              },
              "& .MuiDataGrid-row.Mui-selected ": {
                background: "#F9DED4",
              },
              "& .MuiCheckbox-root.Mui-checked": {
                color: "#D7987D",
              },
            }}
          />
        </Paper>
      </div>
      {isAddAccountOpen && (
        <AddAccount
          isOpen={isAddAccountOpen}
          onClose={handleCloseAddAccountButtonClick}
          onAddAccount={addNewAccount}
        ></AddAccount>
      )}

      {isUpdateAccountOpen && (
        <UpdateAccount
          isOpen={isUpdateAccountOpen}
          onClose={handleCloseUpdateAccountButtonClick}
          onUpdateAccount={updateAccount}
        ></UpdateAccount>
      )}
    </div>
  );
};

export default ManagerAccount;
