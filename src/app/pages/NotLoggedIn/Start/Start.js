import React, { useContext, useState } from "react";
import clsx from "clsx";
import styles from "./Start.module.css";

import Pic1 from "../../../assets/pic1.svg";
import Promotion1 from "../../../assets/Promotion/image 1.svg";
import Promotion2 from "../../../assets/Promotion/image 2.svg";
import Promotion3 from "../../../assets/Promotion/image 3.svg";
import Promotion4 from "../../../assets/Promotion/image 4.svg";
import Pic2 from "../../../assets/pic2.svg";

import BuyTicket from "../../../components/BuyTicket";
import { TicketContext } from "../../../modules/TicketContext";

const Start = () => {
  const { isRoundTrip } = useContext(TicketContext);

  return (
    <div className={styles.startContainer}>
      {/* BUY TICKET */}
      <div className={styles.buyTickerContainer}>
        <img src={Pic1} alt="Pic1" />
        <div className={styles.blur1} />
        <div className={styles.buyTicketSpace}>
          <h3 style={{ textAlign: "center" }}>Đặt vé ngay</h3>
          <BuyTicket isRoundTripFiding></BuyTicket>
        </div>
      </div>

      <div>
        {/* PROMOTION */}
        <div className={styles.promotionContainer}>
          <div className={styles.promotionText}>
            <h3>KHUYẾN MÃI NỔI BẬT</h3>
            <p className="p1">Các khuyến mãi hấp dẫn nổi bật</p>
          </div>

          <div className={styles.listOfPromotions}>
            <img src={Promotion1} alt="Promotion1" />
            <img src={Promotion2} alt="Promotion2" />
            <img src={Promotion3} alt="Promotion3" />
            <img src={Promotion4} alt="Promotion4" />
          </div>
        </div>

        {/* DETAIL */}
        <div className={styles.detailContainer}>
          <div className={styles.detailText}>
            <h3>
              odau<span style={{ color: "#D7987D" }}>re</span>hon{" "}
              <span style={{ fontWeight: 600 }}>
                - CHÚNG TÔI SẴN SÀNG HOÀN TIỀN CHO BẠN
              </span>
            </h3>
          </div>

          <div className={styles.contentSpace}>
            <img src={Pic2} alt="Pic2}" />
            <div className={styles.listOfContent}>
              <div className={styles.contentContainer}>
                <h3>Hơn 200000 lượt đi</h3>
                <p className="p2">
                  odaurehon đã nhận hơn 200000 trong năm 2023
                </p>
              </div>
              <div className={styles.contentContainer}>
                <h3>Hơn 350 trạm</h3>
                <p className="p2">
                  odaurehon có hơn 350 trạm, nơi đón khắp cả nước giúp khách
                  hàng đến được tận nơi họ cần
                </p>
              </div>
              <div className={styles.contentContainer}>
                <h3>Hơn 1000 chuyến xe</h3>
                <p className="p2">
                  odaurehon có hone 1000 chuyến xe chạy mỗi ngày trong tuần
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTACT WITH US */}
        <div className={styles.contactContainer}>
          <div className={styles.contactFlexBox}>
            <div className={styles.line}></div>
            <h3 style={{ textAlign: "center" }}>LIÊN HỆ VỚI CHÚNG TÔI</h3>
            <div className={styles.inputFillContainer}>
              <div className={styles.nameAndNumber}>
                <div className={styles.itemInput}>
                  <p className="uiSemibold">Họ và tên</p>
                  <input
                    type="text"
                    className={styles.inputBasic}
                    placeholder="Nguyễn Văn A"
                  ></input>
                </div>
                <div className={styles.itemInput}>
                  <p className="uiSemibold">Số điện thoại</p>
                  <input
                    type="text"
                    className={styles.inputBasic}
                    placeholder="0xx xxx xxxx"
                  ></input>
                </div>
              </div>
              <div className={styles.itemInput}>
                <p className="uiSemibold">Email</p>
                <input
                  type="text"
                  className={styles.inputBasic}
                  placeholder="abc@gmail.com"
                ></input>
              </div>
              <div className={styles.itemInputAndButton}>
                <div className={styles.itemExplantInput}>
                  <p className="uiSemibold">Việc cần liên hệ</p>
                  <textarea className={styles.explantInput}></textarea>
                </div>
                <button>
                  <h4>Gửi</h4>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
