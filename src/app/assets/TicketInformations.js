function resultData(id, numberOfSeat, locationFrom, locationTo, dateTime, numberOfCar, idCar, cost, percentDiscount) {
    return { id, numberOfSeat, locationFrom, locationTo, dateTime, numberOfCar, idCar, cost, percentDiscount };
}

const rows = [
    resultData(1, 2, 'Hà Nội', 'Hải Phòng', '2024-12-30 08:00', 101, 'A01', 150000, 10),
    resultData(2, 3, 'Hà Nội', 'Quảng Ninh', '2024-12-30 09:00', 102, 'A02', 180000, 5),
    resultData(3, 1, 'Hà Nội', 'Hải Dương', '2024-12-30 10:00', 103, 'A03', 120000, 0),
    resultData(4, 4, 'Hà Nội', 'Nam Định', '2024-12-30 11:00', 104, 'A04', 200000, 15),
    resultData(5, 2, 'Hà Nội', 'Thái Bình', '2024-12-30 12:00', 105, 'A05', 160000, 0),
    resultData(6, 3, 'Hà Nội', 'Vĩnh Phúc', '2024-12-30 13:00', 106, 'A06', 175000, 20),
    resultData(7, 5, 'Hà Nội', 'Hưng Yên', '2024-12-30 14:00', 107, 'A07', 220000, 10),
    resultData(8, 1, 'Hà Nội', 'Phú Thọ', '2024-12-30 15:00', 108, 'A08', 130000, 5),
    resultData(9, 2, 'Hà Nội', 'Bắc Giang', '2024-12-30 16:00', 109, 'A09', 140000, 0),
    resultData(10, 3, 'Hà Nội', 'Bắc Ninh', '2024-12-30 17:00', 110, 'A10', 165000, 15)
];


export default rows;