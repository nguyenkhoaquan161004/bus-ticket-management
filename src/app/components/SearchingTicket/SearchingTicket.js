import React, { useContext, useState } from 'react';
import styles from './SearchingTicket.module.css'
import clsx from 'clsx';
import { EmployeeContext } from '../../modules/EmployeeContext';
import rows from '../../assets/TicketInformations';
import zIndex from '@mui/material/styles/zIndex';
import { jsPDF } from 'jspdf';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
const SearchingTicket = ({ onPrintBoxStateChange, onChangeTicketBoxStateChange }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [ticketCode, setTicketCode] = useState('');  
    const [row, setFilteredRows] = useState(null);
    const [isResultOpen, setIsResultOpen] = useState(false);
    const { isEmployee } = useContext(EmployeeContext);
    const [error, setError] = useState(null);

    const [isPrintBoxOpen, setIsPrintBoxOpen] = useState(false);
    const [isChangeTicketBoxOpen, setIsChangeTicketBoxOpen] = useState(false);

    const nav = useNavigate();

    const handleSearch = async() => {
        try {
            const response = await axios.get(`http://localhost:5278/check-ticket/${ticketCode}/${phoneNumber}`);
            setFilteredRows(response.data);  
           console.log(response.data);  

            setError(null);  
          } catch (error) {
            setError('Không tìm thấy vé hoặc số điện thoại không khớp.');
          }
        // const result = rows.filter(row => row.id.toString() === searchIdTicket);
    }

    const handleResultOpen = () => {
        setIsResultOpen(true);
    }

    const handleSearchButtonClick = () => {
        handleSearch();
        handleResultOpen();
    }

    const handleOpenPrintBox = () => {
        setIsPrintBoxOpen(true);
        onPrintBoxStateChange(true); // Gửi trạng thái lên cha
    };

    const handleClosePrintBox = () => {
        setIsPrintBoxOpen(false);
        onPrintBoxStateChange(false);

    };
    const handlePrint = () => {
        setIsPrintBoxOpen(false);
        onPrintBoxStateChange(false);
        const noDi = removeVietnameseTones(row.departure);
    const noDen = removeVietnameseTones(row.destination);
    const doc = new jsPDF('p', 'mm', 'a6'); 

   
    doc.setFontSize(12); 
  
    doc.text(`Ma ve: ${row.ticketId}`, 10, 20); 
    doc.text(`So ghe: ${row.seatNumber}`, 10, 30);
    doc.text(`Noi di: ${noDi}`, 10, 40);
    doc.text(`Noi den: ${noDen}`, 10, 50);
    doc.text(`Gio khoi hanh: ${row.departureTime}`, 10, 60);
    doc.text(`So xe: ${row.busNumber}`, 10, 70);
    doc.text(`Bien so xe: ${row.licensePlate}`, 10, 80);
  
    doc.save(`ticket-${row.ticketId}.pdf`);
    };

    const handleOpenChangeTicketBox = () => {
        setIsChangeTicketBoxOpen(true);
        onChangeTicketBoxStateChange(true); // Gửi trạng thái lên cha
    };

    const handleCloseChangeTicketBox = () => {
        setIsChangeTicketBoxOpen(false);
        onChangeTicketBoxStateChange(false); // Gửi trạng thái lên cha
    };
    const removeVietnameseTones = (str) => {
        const vietKey = [
          'aáàạảãâấầậẩẫăắằặẳẵ',
          'eéèẹẻẽêếềệểễ',
          'iíìịỉĩ',
          'oóòọỏõôốồộổỗơớờợởỡ',
          'uúùụủũôốồộổỗơớờợởỡ',
          'yýỳỵỷỹ',
          'dđ'
        ];
        
        const vietChars = [
          'a', 'e', 'i', 'o', 'u', 'y', 'd'
        ];
      
        for (let i = 0; i < vietKey.length; i++) {
          const re = new RegExp('[' + vietKey[i] + ']', 'g');
          str = str.replace(re, vietChars[i]);
        }
      
        return str;
      };
      const handleCancel = async () => {
        try {
          const response = await axios.post(`http://localhost:5278/cancel-ticket-request/${row.ticketId}`);
          if (response.data.message) {
            alert(response.data.message); 
          }
        } catch (error) {
          alert("Error request canceling ticket: " + error.message);
        }
      }; 
    return (
        <div >
            <div className={styles.searchingTicketSpace}>
                <h2 style={{ textAlign: "center" }}>TRA CỨU VÉ XE</h2>
                <div className={styles.infoInputContainer}>
                    <div className={styles.inputTicketFill}>
                        <div className={styles.inputFillContainer}>
                            <p className='uiSemibold'>Số điện thoại</p>
                            <input type="text" className={styles.inputFill} value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}></input>
                        </div>
                        <div className={styles.inputFillContainer}>
                            <p className='uiSemibold'>Mã vé</p>
                            <input
                                type="text"
                                className={styles.inputFill}
                                placeholder="0xx xxx xxxx"
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value)}></input>
                        </div>
                    </div>
                    <button onClick={handleSearchButtonClick}><h4>Tra cứu</h4></button>
                </div>

            </div>
            <div className={styles.graMain}></div>

            {/* RESEARCH RESULT */}
            {isResultOpen && (<div className={styles.researchResultContainer} >
                <h3 style={{ marginTop: 50, textAlign: "center" }}>KẾT QUẢ TRUY XUẤT</h3>
                {row  !=null ? (
                <div className={styles.resultList}>
                    
                            <div  className={styles.resultItemContainer}>
                                <div className={styles.resultItem}>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Mã vé</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.ticketId}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Số ghế</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.seatNumber}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Điểm đi</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.departure}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Điểm đến</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.destination}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Thời gian khởi hành</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.departureTime}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Số xe</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.busNumber}</p>
                                    </div>
                                    <div className={styles.infoField}>
                                        <p className={clsx(styles.topicField, 'uiSemibold')}>Biển số xe</p>
                                        <p className={clsx(styles.contentField, 'p3')}>{row.licensePlate}</p>
                                    </div>
                                </div>
                                <div className={styles.buttonField}>
                                    {isEmployee && (
                                        <button style={{ background: '#2E6B75' }}
                                            onClick={handleOpenPrintBox}><p className='uiSemibold'>In vé</p></button>
                                    )}
                                    {isEmployee && (
                                        <button style={{ background: '#D7987D' }}
                                            onClick={handleOpenChangeTicketBox}><p className='uiSemibold'>Đổi vé</p></button>
                                    )}
                                    <button style={{ background: '#D24F4F' }}  onClick={handleCancel}><p className='uiSemibold'>Hủy vé</p></button>
                                </div>
                                {(isPrintBoxOpen || isChangeTicketBoxOpen) && (
                                    <div className={styles.boxBackground}>
                                        {/* PRINT TICKET */}
                                        {isPrintBoxOpen && (
                                            <div className={styles.printBoxContainer}>
                                                <h3>
                                                    odau<span style={{ color: "#D7987D" }}>re</span>hon
                                                </h3>
                                                <div className={styles.printFlexBoxContainer}>
                                                    <div className={styles.inforSpaceContainer}>
                                                        <div className={styles.inforTicket}>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Mã vé: </h4>
                                                                <p className='p2'>{row.ticketId}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Số ghế:</h4>
                                                                <p className='p2'>{row.seatNumber}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Chuyến xe:</h4>
                                                                <p className='p2'>{row.departure} - {row.destination}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Giờ khởi hành:</h4>
                                                                <p className='p2'>{row.departureTime}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Số xe:</h4>
                                                                <p className='p2'>{row.busNumber}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Biển số xe:</h4>
                                                                <p className='p2'>{row.licensePlate}</p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className={styles.costTicket}>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Giá vé:</h4>
                                                                <p className='p2'>{row.price}VND</p>
                                                            </div>
                                                            
                                                        </div>
                                                        <hr />
                                                       
                                                    </div>
                                                    <div className={styles.listOfBtnsContainer}>
                                                        <buton className={clsx("uiSemibold", styles.cancelButton)}
                                                            onClick={handleClosePrintBox}>Hủy</buton>
                                                        <button
                                                            className={clsx("uiSemibold", styles.printButton)}           onClick={handlePrint}>In vé</button>
                                                    </div>
                                                </div>
                                            </div>)
                                        }

                                        {/* CHANGE TICKET */}
                                        {isChangeTicketBoxOpen && (
                                            <div className={styles.printBoxContainer}>
                                                <h3>
                                                    odau<span style={{ color: "#D7987D" }}>re</span>hon
                                                </h3>
                                                <div className={styles.printFlexBoxContainer}>
                                                    <div className={styles.inforSpaceContainer}>
                                                        <div className={styles.costTicket}>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Họ và tên:</h4>
                                                                <p className='p2'>Tên khách hàng</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Số điện thoại:</h4>
                                                                <p className='p2'>0123456789</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Email:</h4>
                                                                <p className='p2'>abc@gmail.com</p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className={styles.inforTicket}>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Mã vé: </h4>
                                                                <p className='p2'>{row.ticketId}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Số ghế:</h4>
                                                                <p className='p2'>{row.seatNumber}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Chuyến xe:</h4>
                                                                <p className='p2'>{row.departure} - {row.destination}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Giờ khởi hành:</h4>
                                                                <p className='p2'>{row.departureTime}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Số xe:</h4>
                                                                <p className='p2'>{row.busNumber}</p>
                                                            </div>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Biển số xe:</h4>
                                                                <p className='p2'>{row.licensePlate}</p>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className={styles.costTicket}>
                                                            <div className={styles.itemInfor}>
                                                                <h4>Giá vé:</h4>
                                                                <p className='p2'>{row.price}VND</p>
                                                            </div>
                                                            
                                                        </div>
                                                        <hr />
                                                        
                                                    </div>
                                                    <div className={styles.listOfBtnsContainer}>
                                                        <buton className={clsx("uiSemibold", styles.cancelButton)}
                                                            onClick={handleClosePrintBox}>Hủy</buton>
                                                        <button
                                                            className={clsx("uiSemibold", styles.printButton)}
                                                            onClick={() => nav("/employee/ChangeTicket")}>Đổi vé</button>
                                                    </div>
                                                </div>
                                            </div>)
                                        }

                                    </div>)}
                            </div>

                        
                    
                </div>
                 ) : (
                    <p>No results found</p>  // Display a message if no results are found
                )}
            </div>)}


        </div>
    );
};

export default SearchingTicket;