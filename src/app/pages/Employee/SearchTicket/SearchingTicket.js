import React, { useState } from 'react';
import styles from './SearchingTicket.module.css';
import SearchingTicketSpace from '../../../components/SearchingTicket/SearchingTicket'

const SearchingTicket = () => {
    const [isPrintBoxOpen, setIsPrintBoxOpen] = useState(false);
    const [isChangeTicketBoxOpen, setIsChangeTicketBoxOpen] = useState(false);

    const handlePrintBoxStateChange = (isOpen) => {
        setIsPrintBoxOpen(isOpen);
    };

    const handleChangeTicketBoxStateChange = (isOpen) => {
        setIsChangeTicketBoxOpen(isOpen);
    };
    return (
        <div
            style={{
                zIndex: (isPrintBoxOpen || isChangeTicketBoxOpen) ? 10 : 0,
                position: "relative",
                top: 0,
                left: 0,
            }}>
            <SearchingTicketSpace
                onPrintBoxStateChange={handlePrintBoxStateChange}
                onChangeTicketBoxStateChange={handleChangeTicketBoxStateChange}></SearchingTicketSpace>
        </div>
    );
};

export default SearchingTicket;