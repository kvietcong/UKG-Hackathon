import { Context } from "../Context";
import React, { useContext, useState } from "react";

const Lobby = () => {
    const { user } = useContext(Context);
    const [playerList, setPlayerList] = useState([])

    return (
        <main className="player-list">
            <h1>Lobby</h1>
            <ol>
                {playerList.map(player => <li>{player}</li>)}
            </ol>
            <button>Start Game</button>
        </main>
    );
};

export default Lobby;
