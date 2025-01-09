import React from 'react';
import BuyTicket from '../../../components/BuyTicket';
import styles from './ChangeTicket.module.css';
import Pic1 from "../../../assets/pic1.svg";

const ChangeTicket = () => {
    return (
        <div>
            <div className={styles.buyTickerContainer}>
                <img src={Pic1} alt="Pic1" />
                <div className={styles.blur1} />
                <div className={styles.buyTicketSpace}>
                    <h3 style={{ textAlign: "center" }}>ĐỔI VÉ</h3>
                    <BuyTicket
                       toggleChangeTicket ></BuyTicket>
                </div>

            </div>
        </div>
    );
};

export default ChangeTicket;