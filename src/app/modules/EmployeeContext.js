import React, { createContext, useState } from 'react';

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
    const [isEmployee, setIsEmployee] = useState(false);

    const toggleEmployee = () => {
        setIsEmployee(!isEmployee);
        console.log(isEmployee);
    }
    return (
        <EmployeeContext.Provider value={{ isEmployee, toggleEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};