// LinksContext.jsx
import React, { createContext, useState } from 'react';

const LinksContext = createContext();

export const LinksProvider = ({ children }) => {
    const [links, setLink] = useState([]);

    return (
        <LinksContext.Provider value={{ links, setLink }}>
            {children}
        </LinksContext.Provider>
    );
};

export const useLinks = () => {
    return React.useContext(LinksContext);
};
