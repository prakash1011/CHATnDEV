import React, { createContext, useState } from 'react';

// Create the UserContext with default values
export const UserContext = createContext({ user: null, setUser: () => {} });

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const value = {
        user,
        setUser,
    };
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for using the user context
export const useUser = () => React.useContext(UserContext);
