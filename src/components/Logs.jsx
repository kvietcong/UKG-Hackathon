import { Context } from "../Context";
import React, { useContext, useState } from "react";
import "./Home.css"

const Logs = () => {
    const { logs } = useContext(Context);

    return (
        <div className="logs">
            <div>Logs:</div>
            <div>
                {logs.map((log, index)=>
                    <div key={index}>{log}</div>
                )}
            </div>
        </div>
    );
};

export default Logs;
