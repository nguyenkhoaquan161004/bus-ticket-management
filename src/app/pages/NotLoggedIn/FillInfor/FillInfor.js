import React, { useContext, useMemo, useState } from "react";
import styles from "./FillInfor.module.css";
import ButtonBack from "../../../components/ButtonBack/ButtonBack";
import clsx from "clsx";
import axios from "axios";
import { TicketContext } from "../../../modules/TicketContext";
import { useLocation, useNavigate } from "react-router-dom";

const FillInfor = () => {
  const { isRoundTrip } = useContext(TicketContext);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isPaymentBoxOpen, setIsPaymentBoxOpen] = useState(false);

  const location = useLocation();
  const nav = useNavigate();

  const costTicketOutbound = location.state?.costTicketOutbound;
  const costTicketReturn = location.state?.costTicketReturn;
  const sumOfCost = costTicketOutbound + costTicketReturn;
  const locationFromTo = location.state?.location;
  const totalCost = useMemo(() => {
    if (!isRoundTrip) {
      return costTicketOutbound - (discountPercent / 100) * costTicketOutbound;
    } else {
      return sumOfCost - (discountPercent / 100) * sumOfCost;
    }
  }, [isRoundTrip, discountPercent, costTicketOutbound, costTicketReturn]);

  const handleSelectedPromotion = async () => {
    if (!selectedPromotion) {
      alert("Vui lòng nhập mã khuyến mãi");
      return;
    }
    console.log("Selected Promotion:", selectedPromotion); // Kiểm tra giá trị của mã khuyến mãi
    try {
      const response = await axios.get(
        "http://localhost:5278/api/payment/promo",
        {
          params: {
            promoId: selectedPromotion,
          },
        }
      );
      if (response && response.data && response.data.discountPercentage) {
        setDiscountPercent(response.data.discountPercentage);
        alert(`Giảm giá ${response.data.discountPercentage}%`);
      } else {
        alert("Mã khuyến mãi không hợp lệ.");
        setDiscountPercent(0);
      }
    } catch (error) {
      console.error("Error fetching promotion data:", error);
      setDiscountPercent(0);
    }
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handlePayButton = () => {
    if (isChecked) {
      handleOpenPaymentBox();
    } else {
      alert(
        "Vui lòng xác nhận chấp nhận điều khoản và quy định trước khi thanh toán."
      );
    }
    alert("Vui lòng đăng nhập trước thực hiện khi thanh toán.");
  };

  const handleOpenPaymentBox = () => {
    setIsPaymentBoxOpen(true);
  };

  const handleClosePaymentBox = () => {
    setIsPaymentBoxOpen(false);
  };

  return (
    <div className={styles.mainContainer}>
      <ButtonBack />
      <h3>{locationFromTo}</h3>
      <div className={styles.mainSpaceContainer}>
        <div className={styles.fillInforSpaceContainer}>
          <div className={styles.fillInforSpace}>
            <h4>Thông tin khách hàng</h4>
            <div className={styles.listInput}>
              <label className={clsx(styles.itemInput, "uiSemibold")}>
                Họ và tên
                <input
                  type="text"
                  className={clsx(styles.inputBasic, "p3")}
                  placeholder="Nguyễn Văn A"
                ></input>
              </label>
              <label className={clsx(styles.itemInput, "uiSemibold")}>
                Số điện thoại
                <input
                  type="number"
                  className={clsx(styles.inputBasic, "p3")}
                  placeholder="0xx xxx xxxx"
                ></input>
              </label>
              <label className={clsx(styles.itemInput, "uiSemibold")}>
                Email
                <input
                  type="email"
                  className={clsx(styles.inputBasic, "p3")}
                  placeholder="abc@gmail.com"
                ></input>
              </label>
              <label className={clsx(styles.itemInput, "uiSemibold")}>
                Mã khuyến mãi
                <div className={styles.promoCodeContainer}>
                  <input
                    type="text"
                    className={clsx(styles.inputBasic, "p3")}
                    value={selectedPromotion}
                    onChange={(e) => setSelectedPromotion(e.target.value)}
                    placeholder="Nhập mã khuyến mãi"
                  ></input>
                  <button
                    className={clsx(styles.btnApplyPromo, "uiSemibold")}
                    onClick={handleSelectedPromotion}
                  >
                    Áp dụng
                  </button>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className={styles.paymentInforSpaceContainer}>
          <div className={styles.paymentInforSpace}>
            <div className={styles.paymentDetailContainer}>
              <div className={styles.paymentDetailBox}>
                <h4>Thông tin thanh toán</h4>
                <div className={styles.listDetails}>
                  <div className={styles.itemDetails}>
                    <h5>Giá lượt đi:</h5>
                    <p className="uiRegular">{costTicketOutbound}VND</p>
                  </div>
                  {isRoundTrip && (
                    <div className={styles.itemDetails}>
                      <h5>Giá lượt về:</h5>
                      <p className="uiRegular">{costTicketReturn}VND</p>
                    </div>
                  )}
                  <div className={styles.itemDetails}>
                    <h5>Giảm giá:</h5>
                    <p className="uiRegular">{discountPercent}%</p>
                  </div>
                  <div className={styles.itemDetails}>
                    <h5>Thành tiền:</h5>
                    <p className="uiSemibold">{totalCost}VND</p>
                  </div>
                </div>
              </div>
              <label className={clsx(styles.confirmRules, "uiRegular")}>
                <input
                  type="checkbox"
                  value={isChecked}
                  onClick={handleCheck}
                ></input>
                Chấp nhận{" "}
                <span className="uiSemibold" style={{ color: "#D7987D" }}>
                  điều khoản và quy định
                </span>{" "}
                khi đặt vé
              </label>
            </div>

            <div className={styles.paymentRulesContainer}>
              <h4>Quy định đặt vé</h4>
              <p className="p3">
                Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất
                30 phút giờ xe khởi hành, mang theo thông báo đã thanh toán vé
                thành công có chứa mã vé được gửi từ hệ thống.
                <div style={{ height: 21 }}></div>Nếu quý khách có nhu cầu trung
                chuyển, vui lòng liên hệ Tổng đài trung chuyển trước khi đặt vé.
                Chúng tôi không đón/trung chuyển tại những điểm xe trung chuyển
                không thể tới được.
              </p>
            </div>
          </div>

          <div className={styles.paymentConfirmSpace}>
            <label className="p3">
              Tổng tiền: <h4 style={{ color: "#D7987D" }}>{totalCost}VND</h4>
            </label>
            <div className={styles.btnSpace}>
              <button
                className={clsx(styles.btnCancel, "uiSemibold")}
                onClick={() => nav(-1)}
              >
                Hủy
              </button>
              <button
                className={clsx(styles.btnPay, "uiSemibold")}
                onClick={handlePayButton}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>

      {isPaymentBoxOpen && (
        <div
          className={styles.paymentBoxBackground}
          onClick={handleClosePaymentBox}
        >
          <div
            className={styles.paymentBoxContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <h4>THÔNG TIN THANH TOÁN</h4>
            <div className={styles.paymentInforFlexbox}>
              <div className={styles.paymentInforSpace}>
                <div className={styles.menthodPayment}>
                  <p className="uiSemibold">Phương thức thanh toán</p>
                  <div className={styles.listOfMethods}>
                    <label className="p3">
                      <input type="radio" name="menthod"></input>
                      VNPay
                    </label>
                    <label className="p3">
                      <input type="radio" name="menthod"></input>
                      Momo
                    </label>
                  </div>
                </div>
                <div className={styles.costTicketInforFlexbox}>
                  <hr />
                  <div className={styles.mainCostTicketInfor}>
                    <div className={styles.costItem}>
                      <h4>Giá vé:</h4>
                      <p className="p2">{sumOfCost}VND</p>
                    </div>
                    <div className={styles.costItem}>
                      <h4>Giảm giá:</h4>
                      <p className="p2">{discountPercent}%</p>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className={styles.totalCostTicketInfor}>
                  <div className={styles.mainTotalCostTicket}>
                    <h4>Thành tiền: </h4>
                    <h4
                      className={styles.totalCostInfor}
                      style={{ color: "#D7987D" }}
                    >
                      {totalCost}VND
                    </h4>
                  </div>
                  <p className="p3" style={{ color: "#D7987D" }}>
                    Thanh toán trực tuyến qua VNPay
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.paymentConfirmBtnSpace}>
              <button
                className={clsx(styles.btnCancel, "uiSemibold")}
                onClick={handleClosePaymentBox}
              >
                Quay lại
              </button>
              <button className={clsx(styles.btnPay, "uiSemibold")}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FillInfor;
