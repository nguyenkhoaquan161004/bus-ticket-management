import React, { useState } from 'react';
import styles from "./ChooseSeatOneWay.module.css";
import clsx from 'clsx';

// Hàm tạo dữ liệu ghế
function seatData(id, cost, status) {
    return { id, cost, status };
}

// Cấu trúc ghế
const rows = {
    upperFloor: [
        ["A1", "", "A2", "", "A3"],
        ["A4", "", "A5", "", "A6"],
        ["A7", "", "A8", "", "A9"],
        ["A10", "", "A11", "", "A12"],
        ["A13", "", "", "", "A14"],
        ["A15", "A16", "A17", "A18", "A19"],
    ],
    lowerFloor: [
        ["B1", "", "B2", "", "B3"],
        ["B4", "", "B5", "", "B6"],
        ["B7", "", "B8", "", "B9"],
        ["B10", "", "B11", "", "B12"],
        ["B13", "", "", "", "B14"],
        ["B15", "B16", "B17", "B18", "B19"]
    ],
    disabledSeats: ["A5", "A10", "B5", "B10"],
};

// Dữ liệu ghế đầy đủ
const seatDataRows = {
    upperFloor: rows.upperFloor.map((row) =>
        row.map((seat) =>
            seat
                ? seatData(
                    seat,
                    200000,
                    rows.disabledSeats.includes(seat) ? "unavailable" : "available"
                )
                : seatData("", 0, "empty")
        )
    ),
    lowerFloor: rows.lowerFloor.map((row) =>
        row.map((seat) =>
            seat
                ? seatData(
                    seat,
                    200000,
                    rows.disabledSeats.includes(seat) ? "unavailable" : "available"
                )
                : seatData("", 0, "empty")
        )
    ),
};

// Component hiển thị ghế
const SeatRows = ({ onSeatChange }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const toggleSeatSelection = (seatId) => {
        setSelectedSeats((prev) => {
            const updatedSeats = prev.includes(seatId)
                ? prev.filter((id) => id !== seatId)
                : [...prev, seatId]

            onSeatChange(updatedSeats);
            return updatedSeats;
        }
        );
    };

    return (
        <div className={styles.seatChooseInforSpace}>
            <div className={styles.seatContainer}>
                {/* Tầng trên */}
                <div className={styles.column}>
                    <h4>Tầng trên</h4>
                    <div className={styles.seats}>
                        {seatDataRows.upperFloor.map((row, rowIndex) => (
                            <div key={`upper-${rowIndex}`} className={styles.row}>
                                {row.map((seat, seatIndex) => (
                                    <label
                                        key={`upper-${rowIndex}-${seatIndex}`}
                                        style={{ color: "#792F2F" }}
                                        className={clsx(`${styles.seat} 
                                            ${seat.status === "empty" ? styles.empty : ""} 
                                            ${seat.status === "unavailable" ? styles.unavailable : ""}
                                            ${selectedSeats.includes(seat.id) ? styles.selected : ""}`,
                                            "uiSemibold")}
                                    >
                                        {seat.status !== "empty" && (
                                            <>
                                                <input
                                                    type="checkbox"
                                                    name={seat.id}
                                                    onChange={() => toggleSeatSelection(seat.id)}
                                                    disabled={seat.status === "unavailable"}
                                                />
                                                <span>{seat.id}</span>
                                            </>
                                        )}
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tầng dưới */}
                <div className={styles.column}>
                    <h4>Tầng dưới</h4>
                    <div className={styles.seats}>
                        {seatDataRows.lowerFloor.map((row, rowIndex) => (
                            <div key={`lower-${rowIndex}`} className={styles.row}>
                                {row.map((seat, seatIndex) => (
                                    <label
                                        key={`lower-${rowIndex}-${seatIndex}`}
                                        style={{ color: "#792F2F" }}
                                        className={clsx(`${styles.seat} 
                                            ${seat.status === "empty" ? styles.empty : ""} 
                                            ${seat.status === "unavailable" ? styles.unavailable : ""}
                                            ${selectedSeats.includes(seat.id) ? styles.selected : ""}`,
                                            "uiSemibold")}
                                    >
                                        {seat.status !== "empty" && (
                                            <>
                                                <input
                                                    type="checkbox"
                                                    name={seat.id}
                                                    onChange={() => toggleSeatSelection(seat.id)}
                                                    disabled={seat.status === "unavailable"}
                                                />
                                                <span>{seat.id}</span>
                                            </>
                                        )}
                                    </label>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.inforContainer}>
                <label className={clsx(styles.inforItem, "uiSemibold")}>
                    <div className={styles.itemColor1}></div>
                    Đã đặt
                </label>
                <label className={clsx(styles.inforItem, "uiSemibold")}>
                    <div className={styles.itemColor2}></div>
                    Còn trống
                </label>
            </div>
        </div>

    );
};

export default SeatRows;
