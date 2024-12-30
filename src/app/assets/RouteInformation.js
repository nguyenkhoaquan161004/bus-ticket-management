const rows = [
    { id: 1, date: '2024-12-29T08:30', timeDuring: '3 giờ', locationFrom: 'Hà Nội', locationTo: 'Hải Phòng', stationFrom: 'Bến xe Mỹ Đình', stationTo: 'Bến xe Gia Lâm', costNormal: 150000, costVIP: 250000 },
    { id: 2, date: '2024-12-30T09:45', timeDuring: '4 giờ', locationFrom: 'Hồ Chí Minh', locationTo: 'Vũng Tàu', stationFrom: 'Bến xe Miền Đông', stationTo: 'Bến xe Vũng Tàu', costNormal: 120000, costVIP: 200000 },
    { id: 3, date: '2025-01-02T14:00', timeDuring: '5 giờ', locationFrom: 'Đà Nẵng', locationTo: 'Huế', stationFrom: 'Bến xe Đà Nẵng', stationTo: 'Bến xe Huế', costNormal: 100000, costVIP: 180000 },
    { id: 4, date: '2025-01-05T10:30', timeDuring: '2 giờ 30 phút', locationFrom: 'Cần Thơ', locationTo: 'Rạch Giá', stationFrom: 'Bến xe Cần Thơ', stationTo: 'Bến xe Rạch Giá', costNormal: 130000, costVIP: 210000 },
    { id: 5, date: '2025-01-06T12:00', timeDuring: '3 giờ', locationFrom: 'Hải Phòng', locationTo: 'Quảng Ninh', stationFrom: 'Bến xe Cầu Rào', stationTo: 'Bến xe Móng Cái', costNormal: 110000, costVIP: 180000 },
    { id: 6, date: '2025-01-07T06:00', timeDuring: '5 giờ 15 phút', locationFrom: 'Hà Nội', locationTo: 'Sapa', stationFrom: 'Bến xe Giáp Bát', stationTo: 'Bến xe Sapa', costNormal: 150000, costVIP: 250000 },
    { id: 7, date: '2025-01-08T07:30', timeDuring: '4 giờ 45 phút', locationFrom: 'Hồ Chí Minh', locationTo: 'Vũng Tàu', stationFrom: 'Bến xe An Sương', stationTo: 'Bến xe Vũng Tàu', costNormal: 130000, costVIP: 210000 },
    { id: 8, date: '2025-01-10T11:00', timeDuring: '2 giờ', locationFrom: 'Đà Nẵng', locationTo: 'Hội An', stationFrom: 'Bến xe Đà Nẵng', stationTo: 'Bến xe Hội An', costNormal: 50000, costVIP: 90000 },
    { id: 9, date: '2025-01-12T09:15', timeDuring: '3 giờ 30 phút', locationFrom: 'Hà Nội', locationTo: 'Ninh Bình', stationFrom: 'Bến xe Giáp Bát', stationTo: 'Bến xe Ninh Bình', costNormal: 80000, costVIP: 140000 },
    { id: 10, date: '2025-01-15T15:30', timeDuring: '6 giờ', locationFrom: 'Cần Thơ', locationTo: 'Vũng Tàu', stationFrom: 'Bến xe Cần Thơ', stationTo: 'Bến xe Vũng Tàu', costNormal: 170000, costVIP: 260000 },
    { id: 11, date: '2025-01-17T10:00', timeDuring: '3 giờ', locationFrom: 'Hà Nội', locationTo: 'Quảng Ninh', stationFrom: 'Bến xe Mỹ Đình', stationTo: 'Bến xe Quảng Ninh', costNormal: 120000, costVIP: 200000 },
    { id: 12, date: '2025-01-19T08:45', timeDuring: '4 giờ 30 phút', locationFrom: 'Hồ Chí Minh', locationTo: 'Bình Dương', stationFrom: 'Bến xe Miền Tây', stationTo: 'Bến xe Bình Dương', costNormal: 90000, costVIP: 150000 },
    { id: 13, date: '2025-01-20T13:30', timeDuring: '5 giờ', locationFrom: 'Đà Nẵng', locationTo: 'Quảng Nam', stationFrom: 'Bến xe Đà Nẵng', stationTo: 'Bến xe Quảng Nam', costNormal: 70000, costVIP: 120000 },
    { id: 14, date: '2025-01-22T10:30', timeDuring: '4 giờ', locationFrom: 'Hà Nội', locationTo: 'Thanh Hóa', stationFrom: 'Bến xe Giáp Bát', stationTo: 'Bến xe Thanh Hóa', costNormal: 100000, costVIP: 180000 },
    { id: 15, date: '2025-01-23T09:00', timeDuring: '2 giờ 30 phút', locationFrom: 'Cần Thơ', locationTo: 'Sóc Trăng', stationFrom: 'Bến xe Cần Thơ', stationTo: 'Bến xe Sóc Trăng', costNormal: 80000, costVIP: 130000 },
    { id: 16, date: '2025-01-25T17:00', timeDuring: '3 giờ 15 phút', locationFrom: 'Hồ Chí Minh', locationTo: 'Phan Thiết', stationFrom: 'Bến xe Miền Đông', stationTo: 'Bến xe Phan Thiết', costNormal: 140000, costVIP: 220000 },
    { id: 17, date: '2025-01-27T06:30', timeDuring: '5 giờ 30 phút', locationFrom: 'Hà Nội', locationTo: 'Hòa Bình', stationFrom: 'Bến xe Giáp Bát', stationTo: 'Bến xe Hòa Bình', costNormal: 110000, costVIP: 190000 },
    { id: 18, date: '2025-01-28T12:15', timeDuring: '4 giờ', locationFrom: 'Hồ Chí Minh', locationTo: 'Long An', stationFrom: 'Bến xe An Sương', stationTo: 'Bến xe Long An', costNormal: 75000, costVIP: 130000 },
    { id: 19, date: '2025-02-01T14:30', timeDuring: '3 giờ 45 phút', locationFrom: 'Đà Nẵng', locationTo: 'Quảng Ngãi', stationFrom: 'Bến xe Đà Nẵng', stationTo: 'Bến xe Quảng Ngãi', costNormal: 85000, costVIP: 150000 },
    { id: 20, date: '2025-02-05T16:00', timeDuring: '2 giờ 15 phút', locationFrom: 'Hà Nội', locationTo: 'Vĩnh Phúc', stationFrom: 'Bến xe Giáp Bát', stationTo: 'Bến xe Vĩnh Phúc', costNormal: 95000, costVIP: 160000 },
];

export default rows;