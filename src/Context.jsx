import React, { useState, createContext, useEffect } from "react";
import { app, db } from "./config/firebase";

const Context = createContext();

const ContextProvider = props => {
    const [ user, setUser ] = useState("Default");

    return (
        <Context.Provider value={{user, setUser}}>
            {props.children}
        </Context.Provider>
    );
};

export { Context, ContextProvider };
