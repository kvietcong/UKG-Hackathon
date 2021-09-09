import { Context } from "../Context";
import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function handleStartGame(roomCode, history) {
    history.push(`/${roomCode}/game`)
}

const Lobby = () => {
    const { user } = useContext(Context);
    const [playerList, setPlayerList] = useState([])
    const {lobbyID} = useParams()
    const history = useHistory()    

    return (
        <main className="player-list">
            <h1>Lobby {lobbyID}</h1>
            <ol>
                {playerList.map(player => <li>{player}</li>)}
            </ol>
            <button onClick={() => {handleStartGame(lobbyID, history)}}>Start Game</button>
        </main>
    );
};

export default Lobby;
