import React, { createContext, useState } from "react";

const LocalStorageContext = createContext();

export const LocalStorageProvider = ({ children }) => {
    const [listLiked, setListLiked] = useState([]);
    const [listDisLiked, setListDisLiked] = useState([]);
    const [listFavorite, setListFavorite] = useState([]);

    return (
        <LocalStorageContext.Provider
            value={{
                listLiked,
                setListLiked,
                listDisLiked,
                setListDisLiked,
                listFavorite,
                setListFavorite,
            }}
        >
            {children}
        </LocalStorageContext.Provider>
    );
};

export default LocalStorageContext;
