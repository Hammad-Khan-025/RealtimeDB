import React, { createContext, useState } from 'react';

// Create a context
export const UsersContext = createContext();

// Create a provider component
export const UsersProvider = ({ children }) => {
    const [usersArray, setUsersArray] = useState([]);
    return (
        <UsersContext.Provider value={{ usersArray, setUsersArray }}>
            {children}
        </UsersContext.Provider>
    );
};
