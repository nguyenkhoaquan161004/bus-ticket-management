import { createContext, useContext, useState } from "react";

export const ChangeTicketContext = createContext();

export const useChangeTicket = () => {
    return useContext(ChangeTicketContext);
};

export const ChangeTicketProvider = ({ children }) => {
    const [isChangeTicket, setIsChangeTicket] = useState(false);

    const toggleChangeTicket = () => setIsChangeTicket(!isChangeTicket);

    return (
        <ChangeTicketContext.Provider
            value={{ isChangeTicket, toggleChangeTicket }}>
            {children}
        </ChangeTicketContext.Provider>
    )
}