import React, { useState,useContext, } from 'react';
import styles from "./BuyTicket.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import {ChangeTicketContext} from '../../modules/ChangeTicketContext';
import axios from 'axios';

const ChooseRound = ({ rows, isRoundTrip }) => {
    const nav = useNavigate();
    const [selectedTrips, setSelectedTrips] = useState([]); 
const { isChangeTicket, toggleChangeTicket } = useContext(ChangeTicketContext);
  const location = useLocation();

  const ChangeTicket = location.state?.ticketChange;
    const accountType = localStorage.getItem("accountType");

    const onChooseTrip =async (row) => {
        if (isRoundTrip) {
            if (selectedTrips.length === 0) {
                // Chọn chuyến đi
                setSelectedTrips([row]);
                alert("Chọn chuyến về");
            } else if (selectedTrips.length === 1) {
                // Chọn chuyến về
                const updatedTrips = [...selectedTrips, row];
                setSelectedTrips(updatedTrips);

                // Chuyển hướng sau khi chọn đủ 2 chuyến
                const routePrefix = accountType === "Customer" 
                    ? '/customer' 
                    : accountType === "Ticketcletk" 
                    ? '/employee' 
                    : '/admin';
                nav(`${routePrefix}/ChooseSeatRoundTrip`, { state: { selectedTrips: updatedTrips } });
            }
        } else {
            console.log(ChangeTicket)
            if(ChangeTicket!=null)
                {
                    const response = await axios.post(`http://localhost:5278/change-ticket-request/${ChangeTicket.ticketId}/${row.busBusRouteID}`);

                    if (response.status === 200) {
                        alert('Gửi yêu cầu thành công');              
                    }
                } 
                else
                {
                    const routePrefix = accountType === "Customer" 
                    ? '/customer' 
                    : accountType === "Ticketcletk" 
                    ? '/employee' 
                    : '/admin';
                nav(`${routePrefix}/ChooseSeatOneWay`, { state: { selectedTrip: row } });
                }          
                 
        }
    };

    const calculateArrivalTime = (departureTime, duration) => {
        if (typeof duration !== 'string') {
            console.error('Duration is not a string:', duration);
            return '';
        }

    const departureDate = new Date(departureTime);
    const [durHours, durMinutes] = duration.split(":").map(Number);
    departureDate.setHours(departureDate.getHours() + durHours);
    departureDate.setMinutes(departureDate.getMinutes() + durMinutes);

        return departureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatTime = (time) => {
        const date = new Date(time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDuration = (duration) => {
        if (!duration) return '';
        const [hours, minutes] = duration.split(':');
        return `${hours} giờ ${minutes} phút`;
    };

  return (
    <div>
      <div className={styles.resultList}>
        {rows.map((row, i) => (
          <div key={i} className={styles.resultItem}>
            <div className={styles.inforContainer}>
              <div className={styles.roundInfor}>
                <div className={styles.fromTo}>
                  <p className="p1">{formatTime(row.departureTime)}</p>
                  <p className="p3" style={{ textAlign: "center" }}>
                    {row.departPlace}
                  </p>
                </div>
                <div className={styles.duringTimeSpace}>
                  <p className="p1">{formatDuration(row.duration)}</p>
                  <div className={styles.line}></div>
                </div>
                <div className={styles.fromTo}>
                  <p className="p1">
                    {calculateArrivalTime(row.departureTime, row.duration)}
                  </p>
                  <p className="p3" style={{ textAlign: "center" }}>
                    {row.arrivalPlace}
                  </p>
                </div>
              </div>

              <div className={styles.roundGeneralInfor}>
                <p className="p3">{row.seatsAvailable} giường trống</p>
                <p className="p3" style={{ color: "#D7987D" }}>
                  {row.pricePerSeat} VND
                </p>
                <button onClick={() => onChooseTrip(row)}>
                  <p2>Chọn chuyến</p2>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseRound;
