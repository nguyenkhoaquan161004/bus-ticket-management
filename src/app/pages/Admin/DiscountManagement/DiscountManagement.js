import React, { useState } from "react";
import styles from "./DiscountManagement.module.css";
import { InlineIcon } from "@iconify/react";
import { Radio } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import AddPromotion from "./AddPromotion";
import UpdatePromotion from "./UpdatePromotion";
import rows from "../../../assets/Promotion";
import axios from "axios";
import { useEffect } from "react";
import { format } from "date-fns";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "namePromotion", headerName: "Tên khuyến mãi", width: 250 },
  { field: "dateStart", headerName: "Ngày bắt đầu", width: 200 },
  { field: "dateEnd", headerName: "Ngày kết thúc", width: 200 },
  { field: "percentDiscount", headerName: "Phần trăm giảm giá", width: 212 },
];

const paginationModel = { page: 0, pageSize: 10 };

const DiscountManagement = () => {
  const [isAddPromotionOpen, setIsAddPromotionOpen] = useState(false);
  const [isUpdatePromotionOpen, setIsUpdatePromotionOpen] = useState(false);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [selectedValue, setSelectedValue] = useState("all");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:5278/api/promotion");
        const promotionsWithId = response.data.map((promotion) => ({
          id: promotion.promoID,
          namePromotion: promotion.name,
          dateStart: format(new Date(promotion.startDate), "dd-MM-yyyy"),
          dateEnd: format(new Date(promotion.endDate), "dd-MM-yyyy"),
          percentDiscount: `${promotion.discountPercent}%`,
        }));
        setFilteredRows(promotionsWithId);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };
    fetchPromotions();
  }, []);

  const handleAddPromotionButtonCLick = () => {
    setIsAddPromotionOpen(true);
  };

  const handleCloseAddPromotionButtonClick = () => {
    setIsAddPromotionOpen(false);
  };

  const handleOpenUpdatePromotionButtonClick = () => {
    if (!selectedRowId) {
      alert("Vui lòng chọn 1 khuyến mãi để cập nhật.");
      return;
    }
    setIsUpdatePromotionOpen(true);
  };

  const handleCloseUpdatePromotionButtonClick = () => {
    setIsUpdatePromotionOpen(false);
  };

  const addNewPromotion = (newPromotion) => {
    const newPromotionId = {
      id: newPromotion.promoID,
      namePromotion: newPromotion.name,
      dateStart: format(new Date(newPromotion.startDate), "dd-MM-yyyy"),
      dateEnd: format(new Date(newPromotion.endDate), "dd-MM-yyyy"),
      percentDiscount: `${newPromotion.discountPercent}%`,
    };

    setFilteredRows((prevRows) => [...prevRows, newPromotionId]);
    alert("Khuyến mãi mới được thêm thành công.");
  };

  const handleSelectionChange = (selection) => {
    if (selection.length === 1) {
      const selectedRow = filteredRows.find((row) => row.id === selection[0]);
      console.log(selectedRow);
      setSelectedRowId(selectedRow);
    } else {
      setSelectedRowId(null);
    }

    setSelectedRowIds(selection);
  };

  const updatePromotion = (
    updatedName,
    updatedDateStart,
    updatedDateEnd,
    updatedPresentDiscount
  ) => {
    setFilteredRows((prevRows) =>
      prevRows.map((row) =>
        row.id === selectedRowId.id
          ? {
              ...row,
              namePromotion: updatedName,
              dateStart: updatedDateStart,
              dateEnd: updatedDateEnd,
              percentDiscount: updatedPresentDiscount,
            }
          : row
      )
    );
    alert("Cập nhật khuyến mãi thành công.");
  };

  const handleDeletePromotion = () => {
    if (selectedRowIds.length === 0) {
      alert("Vui lòng chọn ít nhất 1 khuyến mãi để xóa.");
      return;
    }

    const isConfirmed = window.confirm(
      "Bạn có chắc muốn xóa khuyến mãi này không?"
    );
    if (isConfirmed) {
      setFilteredRows((prevRows) =>
        prevRows.filter((row) => !selectedRowIds.includes(row.id))
      );
      setSelectedRowIds([]);
      alert("Khuyến mãi đã được xóa thành công.");
    }
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <h1 className={styles.mainTopic}>KHUYẾN MÃI</h1>
        {/* SEARCHING SPACE */}
        <div className={styles.genaralContainer}>
          <div className={styles.inputSelectionContainer}>
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
          </div>
          <div className={styles.toolsManagerContainer}>
            <button className={styles.addButotn}>
              <InlineIcon
                className={styles.icon}
                icon="ic:round-add"
                onClick={handleAddPromotionButtonCLick}
              ></InlineIcon>
            </button>
            <button className={styles.deleteButotn}>
              <InlineIcon
                className={styles.icon}
                icon="pepicons-pop:line-x"
                onClick={handleDeletePromotion}
              ></InlineIcon>
            </button>
            <button className={styles.updateButotn}>
              <InlineIcon
                className={styles.icon}
                icon="bxs:pencil"
                onClick={handleOpenUpdatePromotionButtonClick}
              ></InlineIcon>
            </button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paper
            sx={{
              height: "646px",
              width: "70%",
              margin: "0 30px",
              marginTop: "67px",
              overflowY: "hidden",
            }}
          >
            <DataGrid
              rows={filteredRows}
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
      {isAddPromotionOpen && (
        <AddPromotion
          isOpen={isAddPromotionOpen}
          onClose={handleCloseAddPromotionButtonClick}
          onAddPromotion={addNewPromotion}
        ></AddPromotion>
      )}

      {isUpdatePromotionOpen && (
        <UpdatePromotion
          isOpen={isUpdatePromotionOpen}
          onClose={handleCloseUpdatePromotionButtonClick}
          onUpdatePromotion={updatePromotion}
          namePromotion={selectedRowId.namePromotion}
          dateStart={
            selectedRowId.dateStart
              ? selectedRowId.dateStart.split("-").reverse().join("/")
              : ""
          }
          dateEnd={
            selectedRowId.dateEnd
              ? selectedRowId.dateEnd.split("-").reverse().join("/")
              : ""
          }
          percentDiscount={selectedRowId.percentDiscount}
        ></UpdatePromotion>
      )}
    </div>
  );
};

export default DiscountManagement;
