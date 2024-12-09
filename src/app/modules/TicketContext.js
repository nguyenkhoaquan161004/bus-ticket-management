import React, { createContext, useState } from 'react';

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const [isRoundTrip, setIsRoundTrip] = useState(false);

    const toggleRoundTrip = () => {
        setIsRoundTrip(!isRoundTrip);
        console.log(isRoundTrip);
    };

    return (
        <TicketContext.Provider value={{ isRoundTrip, toggleRoundTrip }}>
            {children}
        </TicketContext.Provider>
    )
}