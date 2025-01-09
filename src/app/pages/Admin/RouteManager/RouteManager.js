import React, { useState } from "react";
import styles from "./RouteManager.module.css";
import { InlineIcon } from "@iconify/react";
import { Radio } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AddTicket from "./AddTicket";
import UpdateTicket from "./UpdateTicket";

import rows from "../../../assets/RouteInformation";
import axios from "axios";
import { useEffect } from "react";
import { format } from "date-fns";


const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 180,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "date",
    headerName: "Thời gian khởi hành",
    width: 232,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "timeDuring",
    headerName: "Thời gian đi",
    width: 120,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "locationFrom",
    headerName: "Điểm đi",
    width: 232,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "locationTo",
    headerName: "Điểm đến",
    width: 232,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "stationFrom",
    headerName: "Trạm đi",
    width: 232,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "stationTo",
    headerName: "Trạm đến",
    width: 232,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "costNormal",
    type: "number",
    headerName: "Đơn giá thường",
    width: 212,
    align: "right",
    headerAlign: "center",
  },
  {
    field: "costVIP",
    type: "number",
    headerName: "Đơn giá VIP",
    width: 212,
    align: "right",
    headerAlign: "center",
  },
];

const paginationModel = { page: 0, pageSize: 10 };

const RouteManager = () => {
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  const [isUpdateTicketOpen, setIsUpdateTicketOpen] = useState(false);
  const [locationFrom, setStartLoaction] = useState("");
  const [locationTo, setEndLoction] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [fillteredRows, setFilteredRows] = useState(rows);
  const [notification, setNotification] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:5278/api/busroute");
        const routesData = response.data.map((route) => ({
          id: route.busRouteID,
          date: format(new Date(route.departureTime), "dd-MM-yyyy"),
          timeDuring: route.duration,
          locationFrom: route.departPlace,
          locationTo: route.arrivalPlace,
          stationFrom: route.departStation,
          stationTo: route.arrivalStation,
          costNormal: route.pricePerSeat,
          costVIP: route.pricePerSeatVip,
        }));
        setFilteredRows(routesData);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  const addNewTicket = (newTicket) => {
    setFilteredRows((prevRows) => [...prevRows, newTicket]);
    alert("Vé mới được thêm thành công.");
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

  const updateTicketCost = (
    updateDate,
    updateTimeDuring,
    updateLocationFrom,
    upadteLocationTo,
    updateStationFrom,
    updateStationTo,
    updateCostNormal,
    updateCostVIP
  ) => {
    setFilteredRows((prevRows) =>
      prevRows.map((row) =>
        row.id === selectedRowId.id
          ? {
              ...row,
              date: updateDate,
              timeDuring: updateTimeDuring,
              locationFrom: updateLocationFrom,
              locationTo: upadteLocationTo,
              stationFrom: updateStationFrom,
              stationTo: updateStationTo,
              costNormal: updateCostNormal,
              costVIP: updateCostVIP,
            }
          : row
      )
    );
    alert("Cập nhật đơn giá thành công.");
  };

  const handleAddTicketButtonCLick = () => {
    setIsAddTicketOpen(true);
  };

  const handleCloseAddTicketButtonClick = () => {
    setIsAddTicketOpen(false);
  };

  const handleOpenUpdateTicketButtonClick = () => {
    if (!selectedRowId) {
      alert("Vui lòng chọn một vé để cập nhật.");
      return;
    }
    setIsUpdateTicketOpen(true);
  };

  const handleCloseUpdateTicketButtonClick = () => {
    setIsUpdateTicketOpen(false);
  };

  const handleSearching = () => {
    const filteredData = rows.filter((row) => {
      const rowDateFormatted = row.date.split("/").reverse().join("-"); // Chuyển 'dd/mm/yyyy' thành 'yyyy-mm-dd'
      return (
        (!locationFrom ||
          (row.locationFrom && row.locationFrom.includes(locationFrom))) &&
        (!locationTo ||
          (row.locationTo && row.locationTo.includes(locationTo))) &&
        (!departureDate || rowDateFormatted === departureDate)
      );
    });
    setFilteredRows(filteredData);
  };

  const handleDeleteTicket = () => {
    if (selectedRowIds.length === 0) {
      alert("Vui lòng chọn ít nhất một vé để xóa.");
      return;
    }

    const isConfirmed = window.confirm("Bạn có chắc muốn xóa vé này không?");
    if (isConfirmed) {
      setFilteredRows((prevRows) =>
        prevRows.filter((row) => !selectedRowIds.includes(row.id))
      );
    }
    setSelectedRowIds([]);
    alert("Vé đã xóa thành công.");
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <h2 className={styles.mainTopic}>QUẢN LÝ TUYẾN TRÌNH</h2>
        {/* SEARCHING SPACE */}
        <div className={styles.genaralContainer}>
          <div className={styles.inputSelectionContainer}>
            <div className={styles.inputLocationContainer}>
              <p className="uiSemibold">Điểm đi</p>
              <input
                type="text"
                className={styles.inputLocation}
                value={locationFrom}
                onChange={(e) => setStartLoaction(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputLocationContainer}>
              <p className="uiSemibold">Điểm đến</p>
              <input
                type="text"
                className={styles.inputLocation}
                value={locationTo}
                onChange={(e) => setEndLoction(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputLocationContainer}>
              <p className="uiSemibold">Ngày đi</p>
              <input
                type="date"
                className={styles.inputTime}
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              ></input>
            </div>
            <button style={{ border: "none" }} onClick={handleSearching}>
              <p className="uiSemibold">Tìm kiếm</p>
            </button>
          </div>
          <div className={styles.toolsManagerContainer}>
            <button className={styles.addButotn}>
              <InlineIcon
                className={styles.icon}
                icon="ic:round-add"
                onClick={handleAddTicketButtonCLick}
              ></InlineIcon>
            </button>
            <button className={styles.deleteButotn}>
              <InlineIcon
                className={styles.icon}
                icon="pepicons-pop:line-x"
                onClick={handleDeleteTicket}
              ></InlineIcon>
            </button>
            <button className={styles.updateButotn}>
              <InlineIcon
                className={styles.icon}
                icon="bxs:pencil"
                onClick={handleOpenUpdateTicketButtonClick}
              ></InlineIcon>
            </button>
          </div>
        </div>

        <Paper
          sx={{
            height: "646px",
            width: "98%",
            margin: "0 30px",
            marginTop: "67px",
            overflowY: "hidden",
            justifySelf: "center",
          }}
        >
          <DataGrid
            rows={fillteredRows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 100]}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              handleSelectionChange(newSelection);
            }}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                fontWeight: "bold",
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
      {isAddTicketOpen && (
        <AddTicket
          isOpen={isAddTicketOpen}
          onClose={handleCloseAddTicketButtonClick}
          onAddTicket={addNewTicket}
        ></AddTicket>
      )}

      {isUpdateTicketOpen && (
        <UpdateTicket
          isOpen={isUpdateTicketOpen}
          onClose={handleCloseUpdateTicketButtonClick}
          onUpdateTicket={updateTicketCost}
          date={
            selectedRowId.date
              ? selectedRowId.date.split("-").reverse().join("/")
              : ""
          }
          timeDuring={selectedRowId.timeDuring}
          locationFrom={selectedRowId.locationFrom} // Truyền giá trị cost từ selectedRowId
          locationTo={selectedRowId.locationTo}
          stationFrom={selectedRowId.stationFrom}
          stationTo={selectedRowId.stationTo}
          costNormal={selectedRowId.costNormal}
          costVIP={selectedRowId.costVIP}
        ></UpdateTicket>
      )}
    </div>
  );
};

export default RouteManager;
