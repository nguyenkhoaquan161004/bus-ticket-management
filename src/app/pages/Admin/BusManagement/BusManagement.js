import React, { useState } from "react";
import styles from "./BusManagement.module.css";
import { InlineIcon } from "@iconify/react";
import { Radio } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AddBus from "./AddBus";
import UpdateBus from "./UpdateBus";
import rows from "../../../assets/BusInformation";
import axios from "axios";
import { useEffect } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 60, headerAlign: "center" },
  {
    field: "numOfSeats",
    headerName: "Số ghế",
    width: 80,
    headerAlign: "center",
  },
  { field: "carId", headerName: "Biển số", width: 126, headerAlign: "center" },
  { field: "type", headerName: "Loại xe", width: 168, headerAlign: "center" },
  {
    field: "routes",
    headerName: "Tuyến xe",
    width: 300,
    headerAlign: "center",
  },
  { field: "driver", headerName: "Tài xế", width: 300, headerAlign: "center" },
];

const paginationModel = { page: 0, pageSize: 10 };

const BusManagement = () => {
  const [isAddBusOpen, setIsAddBusOpen] = useState(false);
  const [isUpdateBusOpen, setIsUpdateBusOpen] = useState(false);

  const [searchId, setSearchId] = useState("");
  const [searchCarId, setSearchCarId] = useState("");
  const [searchDriver, setSearchDriver] = useState("");
  const [fillteredRows, setFilteredRows] = useState(rows);
  const [selectedRowId, setSelectedRowId] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [selectedValue, setSelectedValue] = useState("all");

  useEffect(() => {
    const fetchBusesAndRoutes = async () => {
      try {
        const [busesResponse, routesResponse] = await Promise.all([
          axios.get("http://localhost:5278/api/bus"),
          axios.get("http://localhost:5278/api/busroute"),
        ]);

        const busesData = busesResponse.data;
        const routesData = routesResponse.data;

        const busesWithRoutes = busesData.map((bus) => {
          const routes = bus.busBusRoutes
            .map((busRoute) => {
              const route = routesData.find(
                (route) => route.busRouteID === busRoute.busRouteID
              );
              return route
                ? `${route.departPlace} - ${route.arrivalPlace}`
                : "Unknown Route";
            })
            .join(",  ");
            
            


          return {
            id: bus.busID,
            numOfSeats: bus.numSeat,
            carId: bus.plateNum,
            type: bus.type,
            driver: bus.busDrivers,
            routes: routes,
          };
        });

        setFilteredRows(busesWithRoutes);
      } catch (error) {
        console.error("Error fetching buses and routes:", error);
      }
    };

    fetchBusesAndRoutes();
  }, []);

  const handleAddBusButtonCLick = () => {
    setIsAddBusOpen(true);
  };

  const handleCloseAddBusButtonClick = () => {
    setIsAddBusOpen(false);
  };

  const handleOpenUpdateBusButtonClick = () => {
    if (!selectedRowId) {
      alert("Vui lòng chọn một bus để cập nhật.");
      return;
    }
    setIsUpdateBusOpen(true);
  };

  const handleCloseUpdateBusButtonClick = () => {
    setIsUpdateBusOpen(false);
  };

  const handleSearching = () => {
    const filteredData = rows.filter((row) => {
      return (
        (!searchId || String(row.id) === searchId) && // Tìm kiếm ID
        (!searchCarId || (row.carId && row.carId.includes(searchCarId))) && // Tìm kiếm biển số xe
        (!searchDriver || (row.driver && row.driver.includes(searchDriver))) // Tìm kiếm tài xế
      );
    });
    setFilteredRows(filteredData);
  };

  const addNewBus = (newTicket) => {
    setFilteredRows((prevRows) => [...prevRows, newTicket]);
    alert("Bus mới được thêm thành công.");
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

  const updateBus = (
    updateNumOfSeats,
    updateCarId,
    updateType,
    updateRoutes,
    updateDriver
  ) => {
    setFilteredRows((prevRows) =>
      prevRows.map((row) =>
        row.id === selectedRowId.id
          ? {
              ...row,
              numOfSeats: updateNumOfSeats,
              carId: updateCarId,
              type: updateType,
              routes: updateRoutes,
              driver: updateDriver,
            }
          : row
      )
    );
    alert("Cập nhật bus thành công.");
  };

  const handleDeleteBus = () => {
    if (selectedRowIds.length === 0) {
      alert("Vui lòng chọn ít nhất một bus để xóa.");
      return;
    }

    const isConfirmed = window.confirm("Bạn có chắc muốn xóa bus này không?");
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
        <h2 className={styles.mainTopic}>QUẢN LÝ BUS</h2>
        {/* GROUP OF TOOLS */}
        <div className={styles.genaralContainer}>
          <div className={styles.inputSelectionContainer}>
            <div className={styles.inputLocationContainer}>
              <p className="uiSemibold">ID</p>
              <input
                type="number"
                className={styles.inputLocation}
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputLocationContainer}>
              <p className="uiSemibold">Biển số</p>
              <input
                type="text"
                className={styles.inputLocation}
                value={searchCarId}
                onChange={(e) => setSearchCarId(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputLocationContainer}>
              <p className="uiSemibold">Tài xế</p>
              <input
                type="text"
                className={styles.inputLocation}
                value={searchDriver}
                onChange={(e) => setSearchDriver(e.target.value)}
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
                onClick={handleAddBusButtonCLick}
              ></InlineIcon>
            </button>
            <button className={styles.deleteButotn}>
              <InlineIcon
                className={styles.icon}
                icon="pepicons-pop:line-x"
                onClick={handleDeleteBus}
              ></InlineIcon>
            </button>
            <button className={styles.updateButotn}>
              <InlineIcon
                className={styles.icon}
                icon="bxs:pencil"
                onClick={handleOpenUpdateBusButtonClick}
              ></InlineIcon>
            </button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paper
            sx={{
              height: "646px",
              width: "90%",
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
      </div>
      {isAddBusOpen && (
        <AddBus
          isOpen={isAddBusOpen}
          onClose={handleCloseAddBusButtonClick}
          onAddBus={addNewBus}
        ></AddBus>
      )}

      {isUpdateBusOpen && (
        <UpdateBus
          isOpen={isUpdateBusOpen}
          onClose={handleCloseUpdateBusButtonClick}
          onUpdateBus={updateBus}
          numberSeats={selectedRowId.numOfSeats}
          type={selectedRowId.type}
          carId={selectedRowId.carId}
          routes={selectedRowId.routes}
          driver={selectedRowId.driver}
        ></UpdateBus>
      )}
    </div>
  );
};

export default BusManagement;
