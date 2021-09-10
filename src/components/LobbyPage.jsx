import { Context } from "../Context";
import useLobby from "../hooks/useLobby";
import { startLobby } from "../utils/startLobby";
import React, { useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Home.css"

function handleStartGame(lobbyID, history) {
    startLobby(lobbyID);
    history.push(`/${lobbyID}/game`)
}

const Lobby = () => {
    const { user } = useContext(Context);
    const { lobbyID } = useParams();
    const lobby = useLobby(lobbyID);
    const playerList = lobby?.players ?? [];
    const history = useHistory();

    useEffect(() => {
        if (!lobby) return;
        if (lobby.hasStarted) handleStartGame(lobbyID, history)
    }, [ lobby, lobbyID, history ]);

    return (
        <main className="home">
            <div class="card">
                <h1>Lobby {lobbyID}</h1>
                <button className="copy" id="copyURL" onClick={() =>
                    navigator.clipboard.writeText(window.location.href)}>Copy Lobby URL 📝
                </button>
                <h2 style={{marginBottom: 0}}>Players</h2>
                <div style={{textAlign: "left"}}>
                    <ul>{playerList.map(player =>
                        <li key={player} className={user === player ? "currentPlayer" : ""}>
                            {player}
                        </li>)}
                    </ul>
                </div>
                <button onClick={() => {handleStartGame(lobbyID, history)}}>Start Game</button>
            </div>
        </main>
    );
};

export default Lobby;
