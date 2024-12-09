import React from "react";
import styles from "./Footer.module.css";
import { InlineIcon } from "@iconify/react/dist/iconify.js";

export default function Footer() {
  return <div className={styles.footerContainer}>
    <div className={styles.footerFlexBox}>
      <div className={styles.leftSpace}>
        <div className={styles.generalInfor}>
          <h3>odau<span style={{ color: "D7987D" }}>re</span>hon</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <p className="p1">TRUNG TÂM HỖ TRỢ: </p>
            <h4 style={{ color: "#2E6B75" }}>1900 1213</h4>
          </div>
        </div>
        <div className={styles.detailsContainer}>
          <p className="p2">CÔNG TY CỔNG PHẦN XE KHÁCH ODAUREHON</p>
          <p className="p3">Địa chỉ: đường Hàn Thuyên, khu phố 6 P, Thủ Đức, Hồ Chí Minh </p>
          <p className="p3">Email: hotro.odaurehon@gmail.com</p>
          <p className="p3">Điện thoại: 0938.472.853</p>
          <div className={styles.contactContainer}>
            <p className="p3">Liên hệ với chúng tôi</p>
            <div className={styles.listOfIcon}>
              <button>
                <InlineIcon icon="simple-icons:gmail" className={styles.icon} />
              </button>
              <button>
                <InlineIcon icon="ic:round-facebook" className={styles.icon} />
              </button>
              <button>
                <InlineIcon icon="mdi:youtube" className={styles.icon} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightSpace}>
        <div className={styles.basicInfor}>
          <p className="uiSemibold">odaurehon Bus Lines</p>
          <ui>
            <li>Về chúng tôi</li>
            <li>Lịch trình</li>
            <li>Tuyển dụng</li>
            <li>Tin tức và sự kiện</li>
            <li>Khuyến mãi</li>
          </ui>
        </div>

        <div className={styles.basicInfor}>
          <p className="uiSemibold">Hỗ trợ khách hàng</p>
          <ui>
            <li>Tra cứu thông tin đặt vé </li>
            <li>Điều khoản sử dụng</li>
            <li>Câu hỏi thường gặp</li>
          </ui>
        </div>
      </div>
    </div>
  </div>;
}
