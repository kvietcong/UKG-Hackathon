import { Context } from "../Context";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import useLobby from "../hooks/useLobby";

const EndingScreen = () => {
    const { user } = useContext(Context);
    const {id} = useParams()
    const [name, setName] = useState("")
    const [players, setPlayers] = useState([])
    const lobby = useLobby("3Chx4mN0R7pglAKUtEh7")

    useEffect(() => {
        setPlayers(lobby ? lobby.players : [])
    }, [lobby])

    //Non-functional mockup
    return (
        <main className="home">
            <div className="card">
                <b>That's all folks! 🎉</b>
                <table>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                    {players.map(player => <tr key={player}><td>{player}</td><td>SomeScore</td></tr>)}
                </table>
                <button>New Lobby</button>
            </div>
        </main>
    );
};

export default EndingScreen
