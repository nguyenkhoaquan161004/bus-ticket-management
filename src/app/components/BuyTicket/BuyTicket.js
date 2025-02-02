import React, { useContext, useState } from "react";
import styles from "./BuyTicket.module.css";
import { Navigate } from "react-router-dom";
import { TicketContext } from "../../modules/TicketContext";
import { ChangeTicketContext } from "../../modules/ChangeTicketContext";
import axios from "axios";
import ChooseRound from "./ChooseRound";
import { useLocation, useNavigate } from "react-router-dom";

function resultData(
  id,
  locationFrom,
  timeStart,
  locationTo,
  timeEnd,
  timeDuring,
  dateTime,
  freeSeat,
  cost
) {
  const startDateTime = new Date(`${dateTime}T${timeStart}`);
  const endDateTime = new Date(`${dateTime}T${timeEnd}`);
  timeDuring = Math.abs(endDateTime - startDateTime) / (1000 * 60);
  return {
    id,
    locationFrom,
    timeStart,
    locationTo,
    timeEnd,
    timeDuring,
    dateTime,
    freeSeat,
    cost,
  };
}

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa ký tự đầu, giữ nguyên phần còn lại
    .join(" ");
}

function normalizeString(str) {
  return str
    .normalize("NFD") // Tách chữ và dấu
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
    .toLowerCase() // Chuyển về chữ thường
    .replace(/\s+/g, ""); // Loại bỏ khoảng trắng
}

const BuyTicket = () => {
  const { isRoundTrip, toggleRoundTrip } = useContext(TicketContext);
  const { isChangeTicket, toggleChangeTicket } =
    useContext(ChangeTicketContext);
  const location = useLocation();
  const nav = useNavigate();

  const ChangeTicket = location.state?.ticketChange;
  const [searchLoactionFrom, setSearchLoactionFrom] = useState("");
  const [searchLoactionTo, setSearchLoactionTo] = useState("");
  const [searchDateTimeFrom, setSearchDateTimeFrom] = useState("");
  const [searchDateTimeTo, setSearchDateTimeTo] = useState("");
  const [searchFreeSeat, setSearchFreeSeat] = useState("");
  const [selectedTrip, setSelectedTrip] = useState("Chuyến đi");
  const [rows, setRows] = useState([]);
  const [filteredRowsOutbound, setFilteredRowsOutbound] = useState(rows);
  const [filteredRowsReturn, setFilteredRowsReturn] = useState(rows);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [locationFromTo, setLocationFromTo] = useState("");

  const [noResultsOutboundFound, setNoResultsOutboundFound] = useState(false);
  const [noResultsReturnFound, setNoResultsReturnFound] = useState(false);
  const [timeFrames, setTimeFrames] = useState({
    "00:00 - 06:00": false,
    "06:00 - 12:00": false,
    "12:00 - 18:00": false,
    "18:00 - 00:00": false,
  });
  const [filteredTicketsData, setFilteredTicketsData] = useState([]);

  const handleSearchOutbound = () => {
    const outboundResults = rows.filter((row) => {
      return (
        normalizeString(row.locationFrom).includes(
          normalizeString(searchLoactionFrom)
        ) &&
        normalizeString(row.locationTo).includes(
          normalizeString(searchLoactionTo)
        ) &&
        new Date(row.dateTime).toISOString().slice(0, 10) ===
          new Date(searchDateTimeFrom).toISOString().slice(0, 10) &&
        row.freeSeat >= searchFreeSeat
      );
    });

    if (outboundResults.length === 0) {
      setNoResultsOutboundFound(true);
    } else {
      setLocationFromTo(
        capitalizeWords(`${searchLoactionFrom} - ${searchLoactionTo}`)
      );
      setNoResultsOutboundFound(false);
      setFilteredRowsOutbound(outboundResults);
    }
    setIsResultOpen(true);
  };

  const handleSearchReturn = () => {
    const returnResults = rows.filter((row) => {
      return (
        normalizeString(row.locationFrom).includes(
          normalizeString(searchLoactionTo)
        ) &&
        normalizeString(row.locationTo).includes(
          normalizeString(searchLoactionFrom)
        ) &&
        new Date(row.dateTime).toISOString().slice(0, 10) ===
          new Date(searchDateTimeTo).toISOString().slice(0, 10) &&
        row.freeSeat >= searchFreeSeat
      );
    });

    if (returnResults.length === 0) {
      setNoResultsReturnFound(true);
    } else {
      setNoResultsReturnFound(false);
      setFilteredRowsReturn(returnResults);
      setLocationFromTo(
        capitalizeWords(`${searchLoactionTo} - ${searchLoactionFrom}`)
      );
    }
    setIsResultOpen(true);
  };

  const handleTimeFrameChange = (timeFrame) => {
    setTimeFrames((prev) => ({
      ...prev,
      [timeFrame]: !prev[timeFrame],
    }));
  };

  const handleTripSelected = (trip) => {
    setSelectedTrip(trip);
  };

  const handleFilter = () => {
    const filteredData = rows.filter((ticket) => {
      const departureDate = new Date(ticket.dateTime);
      const startDateTime = new Date(searchDateTimeFrom);
      const endDateTime = new Date(searchDateTimeTo);

      const isWithinDateRange =
        departureDate >= startDateTime && departureDate <= endDateTime;

      const departureTime = departureDate.getHours();
      const isWithinTimeFrame = Object.keys(timeFrames).some((timeFrame) => {
        if (timeFrames[timeFrame]) {
          const [startDateTime, endDateTime] = timeFrame
            .split(" - ")
            .map((time) => parseInt(time.replace(":", ""), 10));
          if (startDateTime < endDateTime) {
            return (
              departureTime >= startDateTime / 100 &&
              departureTime < endDateTime / 100
            );
          } else {
            return (
              departureTime >= startDateTime / 100 ||
              departureTime < endDateTime / 100
            );
          }
        }
        return false;
      });

      return isWithinDateRange && isWithinTimeFrame;
    });
    setFilteredTicketsData(filteredData);
  };

  const handleSearchButtonClick = async () => {
    if (isRoundTrip) {
      if (
        !searchLoactionFrom ||
        !searchLoactionTo ||
        !searchDateTimeFrom ||
        !searchDateTimeTo ||
        !searchFreeSeat
      ) {
        alert("Vui lòng nhập đủ thông tin tìm kiếm");
        return;
      }
      try {
        // Tìm kiếm outbound (chuyến đi)
        const outboundResponse = await axios.get(
          "http://localhost:5278/api/bookticket/search",
          {
            params: {
              departPlace: searchLoactionFrom,
              arrivalPlace: searchLoactionTo,
              departureDate: searchDateTimeFrom,
              ticketCount: searchFreeSeat,
            },
          }
        );
        console.log(outboundResponse.data);
        setRows(outboundResponse.data);

        if (outboundResponse.data.length === 0) {
          setNoResultsOutboundFound(true);
        } else {
          setNoResultsOutboundFound(false);
          setFilteredRowsOutbound(outboundResponse.data);
        }

        // Tìm kiếm return (chuyến về)
        const returnResponse = await axios.get(
          "http://localhost:5278/api/bookticket/search",
          {
            params: {
              departPlace: searchLoactionTo,
              arrivalPlace: searchLoactionFrom,
              departureDate: searchDateTimeTo,
              ticketCount: searchFreeSeat,
            },
          }
        );
        console.log(returnResponse.data);
        setRows(returnResponse.data);
        if (returnResponse.data.length === 0) {
          setNoResultsReturnFound(true);
        } else {
          setNoResultsReturnFound(false);
          setFilteredRowsReturn(returnResponse.data);
        }

        setIsResultOpen(true);
      } catch (error) {
        alert("Đã có lỗi xảy ra khi gọi API");
      }
    } else {
      // Tìm kiếm cho chuyến đi một chiều
      if (
        !searchLoactionFrom ||
        !searchLoactionTo ||
        !searchDateTimeFrom ||
        !searchFreeSeat
      ) {
        alert("Vui lòng nhập đủ thông tin tìm kiếm");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:5278/api/bookticket/search",
          {
            params: {
              departPlace: searchLoactionFrom,
              arrivalPlace: searchLoactionTo,
              // departureDate: searchDateTimeFrom,
              ticketCount: searchFreeSeat,
            },
          }
        );
        console.log(response.data);
        setRows(response.data);

        if (response.data.length === 0) {
          setNoResultsOutboundFound(true);
        } else {
          setNoResultsOutboundFound(false);
          setFilteredRowsOutbound(response.data);
        }

        setIsResultOpen(true);
      } catch (error) {
        alert("Đã có lỗi xảy ra khi gọi API");
      }
    }
  };
  return (
    <div>
      <div>
        <div className={styles.fillInputSpace}>
          {/* SWITCH */}
          <div className={styles.switchRoundTrip}>
            <p className="uiSemibold">Khứ hồi</p>
            <div onClick={toggleRoundTrip} style={{ textAlign: "center" }}>
              <div
                style={{
                  display: "inline-block",
                  width: "60px",
                  height: "30px",
                  borderRadius: "30px",
                  backgroundColor: isRoundTrip ? "#D7987D" : "grey",
                  position: "relative",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    position: "absolute",
                    top: "2px",
                    left: isRoundTrip ? "32px" : "2px",
                    transition: "left 0.3s",
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className={styles.fillSearchRoundInfor}>
            <div className={styles.itemInforBasic}>
              <p className="uiSemibold">Điểm đi</p>
              <input
                type="text"
                className={styles.inputBasic}
                value={searchLoactionFrom}
                onChange={(e) => setSearchLoactionFrom(e.target.value)}
              ></input>
            </div>
            <div className={styles.itemInforBasic}>
              <p className="uiSemibold">Điểm đến</p>
              <input
                type="text"
                className={styles.inputBasic}
                value={searchLoactionTo}
                onChange={(e) => setSearchLoactionTo(e.target.value)}
              ></input>
            </div>
            <div className={styles.itemInforBasic}>
              <p className="uiSemibold">Ngày đi</p>
              <input
                type="date"
                className={styles.inputBasic}
                value={searchDateTimeFrom}
                onChange={(e) => setSearchDateTimeFrom(e.target.value)}
              ></input>
            </div>
            <div
              className={styles.itemInforBasic}
              style={{
                display: isRoundTrip ? "block" : "none",
              }}
            >
              <p className="uiSemibold">Ngày về</p>
              <input
                type="date"
                className={styles.inputBasic}
                value={searchDateTimeTo}
                onChange={(e) => setSearchDateTimeTo(e.target.value)}
              ></input>
            </div>
            <div className={styles.itemInforBasic}>
              <p className="uiSemibold">Số vé</p>
              <input
                type="number"
                className={styles.inputBasic}
                value={searchFreeSeat}
                onChange={(e) => setSearchFreeSeat(e.target.value)}
              ></input>
            </div>
          </div>

          <button onClick={handleSearchButtonClick}>
            <h4>Tìm chuyến xe</h4>
          </button>
        </div>
      </div>

      {/* SEARCHING RESULT */}
      {isResultOpen && (
        <div className={styles.resutlContainer}>
          <div className={styles.filterSpace}>
            <div className={styles.flexBoxContainer}>
              <h4>Lọc</h4>
              <div className={styles.filterItem}>
                <p className="uiSemibold">Khung thời gian</p>
                <div className={styles.filterCheckBoxList}>
                  <div className={styles.itemCheckBox}>
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={timeFrames["00:00 - 06:00"]}
                      onChange={() => handleTimeFrameChange("00:00 - 06:00")}
                    />
                    <label className="p3">00:00 - 06:00</label>
                  </div>
                  <div className={styles.itemCheckBox}>
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={timeFrames["06:00 - 12:00"]}
                      onChange={() => handleTimeFrameChange("06:00 - 12:00")}
                    />
                    <label className="p3">06:00 - 12:00</label>
                  </div>
                  <div className={styles.itemCheckBox}>
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={timeFrames["12:00 - 18:00"]}
                      onChange={() => handleTimeFrameChange("12:00 - 18:00")}
                    />
                    <label className="p3">12:00 - 18:00</label>
                  </div>
                  <div className={styles.itemCheckBox}>
                    <input
                      type="checkbox"
                      className={styles.checkboxInput}
                      checked={timeFrames["18:00 - 00:00"]}
                      onChange={() => handleTimeFrameChange("18:00 - 00:00")}
                    />
                    <label className="p3">18:00 - 00:00</label>
                  </div>
                </div>
                <button onClick={handleFilter} className={styles.filterButton}>
                  Lọc
                </button>
              </div>
            </div>
          </div>

          <div className={styles.resultSpace}>
            {isRoundTrip ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: 946,
                }}
              >
                <h4>{locationFromTo}</h4>
                <div className={styles.radioButtons}>
                  <label className="uiSemibold">
                    <input
                      type="radio"
                      name="tripType"
                      value="Chuyến đi"
                      checked={selectedTrip === "Chuyến đi"}
                      onChange={() => handleTripSelected("Chuyến đi")}
                    />
                    Chuyến đi
                  </label>
                  <label className="uiSemibold">
                    <input
                      type="radio"
                      name="tripType"
                      value="Chuyến về"
                      checked={selectedTrip === "Chuyến về"}
                      onChange={() => handleTripSelected("Chuyến về")}
                    />
                    Chuyến về
                  </label>
                </div>
              </div>
            ) : (
              <h4>{locationFromTo}</h4>
            )}

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
              ) : noResultsOutboundFound ? (
                <p className="p2">Không tìm thấy kết quả cho chuyến đi</p>
              ) : (
                <ChooseRound
                  rows={filteredRowsOutbound}
                  isRoundTrip={isRoundTrip}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyTicket;
