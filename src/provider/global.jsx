// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();
export const UserToken = createContext();


export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    return (
        <UserContext.Provider value={{ userId, setUserId, userToken, setUserToken, refreshToken, setRefreshToken }}>
            {children}
        </UserContext.Provider>
    );
};

