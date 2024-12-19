function resultData(id, numberOfSeat, locationFrom, locationTo, dateTime, numberOfCar, idCar) {
    return { id, numberOfSeat, locationFrom, locationTo, dateTime, numberOfCar, idCar };
}

const rows = [
    resultData(1, 30, "Hà Nội", "Đà Nẵng", "2024-11-07 08:00", 101, "VN123"),
    resultData(2, 45, "Hồ Chí Minh", "Nha Trang", "2024-11-07 10:00", 102, "VN124"),
    resultData(3, 40, "Cần Thơ", "Đà Lạt", "2024-11-07 14:00", 103, "VN125"),
    resultData(4, 25, "Hải Phòng", "Quảng Ninh", "2024-11-07 09:00", 104, "VN126"),
    resultData(5, 35, "Đà Nẵng", "Huế", "2024-11-07 11:30", 105, "VN127"),
    resultData(6, 50, "Nha Trang", "Phú Yên", "2024-11-07 16:00", 106, "VN128"),
    resultData(7, 28, "Vũng Tàu", "Hồ Chí Minh", "2024-11-07 12:00", 107, "VN129"),
    resultData(8, 32, "Quảng Nam", "Đà Nẵng", "2024-11-07 17:00", 108, "VN130"),
    resultData(9, 40, "Bình Thuận", "Hồ Chí Minh", "2024-11-07 07:30", 109, "VN131"),
    resultData(10, 38, "Huế", "Quảng Trị", "2024-11-07 13:45", 110, "VN132")
];

export default rows;