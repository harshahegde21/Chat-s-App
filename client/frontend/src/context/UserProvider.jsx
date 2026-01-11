import React, { Children, useState } from "react";
import { createContext } from "react";
export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [username,setuserName] = useState(null);
    
    return(
        <UserContext.Provider value={{username,setuserName}}>
            {children}
        </UserContext.Provider>
    )
}