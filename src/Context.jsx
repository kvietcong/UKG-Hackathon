import React, { useState, createContext, useEffect } from "react";
import { app, db } from "./config/firebase";

const Context = createContext();

const ContextProvider = props => {
    const [ user, setUser ] = useState("Default");
    const [ logs, setLogs ] = useState([]);
    const [ roundNum, setRoundNum] = useState(1);
    function addLog(msg){
        console.log("Adding msg to logs: ", msg)
        setLogs(logs => [...logs, msg]) // NOTE: Using callback to avoid race conditions
    }

    return (
        <Context.Provider value={{user, setUser, logs, addLog, roundNum}}>
            {props.children}
        </Context.Provider>
    );
};

export { Context, ContextProvider };
