import React, { useContext, useMemo, useState } from 'react';
import styles from "./FillInfor.module.css";
import ButtonBack from '../../../components/ButtonBack/ButtonBack';
import clsx from 'clsx';

import { TicketContext } from '../../../modules/TicketContext';
import { useLocation, useNavigate } from 'react-router-dom';

function promotion(id, name, discount) {
    return { id, name, discount }
}

const promotionDatas = [
    promotion(1, "Giảm giá 10% cho lượt đi", 10),
    promotion(2, "Giảm giá 20% cho vé khứ hồi", 20),
    promotion(3, "Giảm giá 15% khi đặt vé sớm", 15),
    promotion(4, "Giảm giá 25% cho nhóm từ 5 người", 25),
    promotion(5, "Ưu đãi đặc biệt mùa lễ hội 30%", 30),
    promotion(6, "Giảm giá 5% cho khách hàng thân thiết", 5)
]

const FillInfor = () => {
    const { isRoundTrip } = useContext(TicketContext);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [selectedPromotion, setSelectedPromotion] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [isPaymentBoxOpen, setIsPaymentBoxOpen] = useState(false);

    const location = useLocation();
    const nav = useNavigate();

    const costTicketOutbound = location.state?.costTicketOutbound;
    const costTicketReturn = location.state?.costTicketReturn;
    const sumOfCost = costTicketOutbound + costTicketReturn;
    const locationFromTo = location.state?.location;
    const totalCost = useMemo(() => {
        if (isRoundTrip !== true) {
            return costTicketOutbound - discountPercent / 100 * costTicketOutbound;
        } else {
            return sumOfCost - discountPercent / 100 * sumOfCost;
        }
    }, [isRoundTrip, discountPercent, costTicketOutbound, costTicketReturn]);

    const handleSelectedPromotion = (e) => {
        const selectedId = parseInt(e.target.value); // Lấy `id` của khuyến mãi được chọn
        setSelectedPromotion(selectedId);

        // Tìm khuyến mãi trong danh sách theo `id`
        const selectedPromo = promotionDatas.find((promo) => promo.id === selectedId);
        if (selectedPromo) {
            setDiscountPercent(selectedPromo.discount); // Lưu `discount` của khuyến mãi
        } else {
            setDiscountPercent(0); // Không có khuyến mãi
        }
    }

    const handleCheck = () => {
        setIsChecked(!isChecked);
        console.log(isChecked);
    }

    const handlePayButton = () => {
        if (isChecked) {
            handleOpenPaymentBox();
        } else {
            alert("Vui lòng xác nhận chấp nhận điều khoản và quy định trước khi thanh toán.");
            return;
        }
    }

    const handleOpenPaymentBox = () => {
        setIsPaymentBoxOpen(true);
    }

    const handleClosePaymentBox = () => {
        setIsPaymentBoxOpen(false);
    }

    return (
        <div className={styles.mainContainer}>
            <ButtonBack></ButtonBack>
            <h3>{locationFromTo}</h3>
            <div className={styles.mainSpaceContainer}>
                {/* FILL INFORMATIONS SPACE */}
                <div className={styles.fillInforSpaceContainer}>
                    <div className={styles.fillInforSpace}>
                        <h4>Thông tin khách hàng</h4>
                        <div className={styles.listInput}>
                            <label className={clsx(styles.itemInput, "uiSemibold")}>
                                Họ và tên
                                <input
                                    type='text'
                                    className={clsx(styles.inputBasic, "p3")}
                                    placeholder='Nguyễn Văn A'></input>
                            </label>
                            <label className={clsx(styles.itemInput, "uiSemibold")}>
                                Số điện thoại
                                <input
                                    type='number'
                                    className={clsx(styles.inputBasic, "p3")}
                                    placeholder='0xx xxx xxxx'></input>
                            </label>
                            <label className={clsx(styles.itemInput, "uiSemibold")}>
                                Email
                                <input
                                    type='email'
                                    className={clsx(styles.inputBasic, "p3")}
                                    placeholder='abc@gmail.com'></input>
                            </label>
                            <label className={clsx(styles.itemInput, "uiSemibold")}>
                                Chọn khuyến mãi
                                <select
                                    className={clsx(styles.selectBasic, "p3")}
                                    onChange={handleSelectedPromotion}>
                                    <option value="0">--Chọn khuyến mãi--</option>
                                    {promotionDatas.map((value, i) => {
                                        return (
                                            <option key={i} value={value.id}>{value.name}: -{value.discount}%</option>
                                        )
                                    })}
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                {/* PAYMENT INFORMATIONS */}
                <div className={styles.paymentInforSpaceContainer}>
                    {/* PAYMENT INFOR SPACE */}
                    <div className={styles.paymentInforSpace}>
                        {/* PAYMENT DETAILS */}
                        <div className={styles.paymentDetailContainer}>
                            <div className={styles.paymentDetailBox}>
                                <h4>Thông tin thanh toán</h4>
                                <div className={styles.listDetails}>
                                    <div className={styles.itemDetails}>
                                        <h5>Giá lượt đi:</h5>
                                        <p className='uiRegular'>{costTicketOutbound}VND</p>
                                    </div>
                                    {isRoundTrip && (
                                        <div className={styles.itemDetails}>
                                            <h5>Giá lượt về:</h5>
                                            <p className='uiRegular'>{costTicketReturn}VND</p>
                                        </div>
                                    )}
                                    <div className={styles.itemDetails}>
                                        <h5>Giảm giá:</h5>
                                        <p className='uiRegular'>{discountPercent}%</p>
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <h5>Thành tiền:</h5>
                                        <p className='uiSemibold'>{totalCost}VND</p>
                                    </div>
                                </div>
                            </div>
                            <label className={clsx(styles.confirmRules, "uiRegular")}>
                                <input
                                    type="checkbox"
                                    value={isChecked}
                                    onClick={handleCheck}></input>
                                Chấp nhận <span className='uiSemibold' style={{ color: "#D7987D" }}>điều khoản và quy định</span> khi đặt vé
                            </label>
                        </div>
                        {/* PAYMENT RULES */}
                        <div className={styles.paymentRulesContainer}>
                            <h4>Quy định đặt vé</h4>
                            <p className='p3'>Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất 30 phút giờ xe khởi hành, mang theo thông báo đã thanh toán vé thành công có chứa mã vé được gửi từ hệ thống.<div style={{ height: 21 }}></div>Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng đài trung chuyển trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những điểm xe trung chuyển không thể tới được.</p>
                        </div>
                    </div>
                    {/* PAYMENT CONFIRMATION */}
                    <div className={styles.paymentConfirmSpace}>
                        <label className='p3'>Tổng tiền: <h4 style={{ color: "#D7987D" }}>{totalCost}VND</h4></label>
                        <div className={styles.btnSpace}>
                            <button
                                className={clsx(styles.btnCancel, "uiSemibold")}
                                onClick={() => nav(-1)}>Hủy</button>
                            <button
                                className={clsx(styles.btnPay, "uiSemibold")}
                                onClick={handlePayButton}>Thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* PAYMENT BOX */}
            {isPaymentBoxOpen && (
                <div
                    className={styles.paymentBoxBackground}
                    onClick={handleClosePaymentBox}>
                    <div
                        className={styles.paymentBoxContainer}
                        onClick={(e) => e.stopPropagation()}>
                        <h4>THÔNG TIN THANH TOÁN</h4>
                        <div className={styles.paymentInforFlexbox}>
                            <div className={styles.paymentInforSpace}>
                                <div className={styles.menthodPayment}>
                                    <p className='uiSemibold'>Phương thức thanh toán</p>
                                    <div className={styles.listOfMethods}>
                                        <label className='p3'>
                                            <input
                                                type='radio'
                                                name='menthod'
                                            ></input>
                                            VNPay
                                        </label>
                                        <label className='p3'>
                                            <input
                                                type='radio'
                                                name='menthod'></input>
                                            Momo
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.costTicketInforFlexbox}>
                                    <hr></hr>
                                    <div className={styles.mainCostTicketInfor}>
                                        <div className={styles.costItem}>
                                            <h4>Giá vé:</h4>
                                            <p className='p2'>{sumOfCost}VND</p>
                                        </div>
                                        <div className={styles.costItem}>
                                            <h4>Giảm giá:</h4>
                                            <p className='p2'>{discountPercent}%</p>
                                        </div>
                                    </div>
                                    <hr></hr>
                                </div>
                                <div className={styles.totalCostTicketInfor}>
                                    <div className={styles.mainTotalCostTicket}>
                                        <h4>Thành tiền: </h4>
                                        <h4
                                            className={styles.totalCostInfor}
                                            style={{ color: "#D7987D" }}>{totalCost}VND</h4>
                                    </div>
                                    <p3
                                        className='p3'
                                        style={{ color: "#E82127" }}>Khách hàng phải thanh toán trước khi xe khởi hành</p3>
                                </div>
                            </div>
                            <div className={styles.listOfBtns}>
                                <button
                                    className={styles.cancelBtn}
                                    onClick={handleClosePaymentBox}><h4>Hủy</h4></button>
                                <button className={styles.payBtn}><h4>Thanh toán</h4></button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default FillInfor;