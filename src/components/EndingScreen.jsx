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
        setPlayers(lobby.players)
    }, [lobby])

    //Non-functional mockup
    return (
        <main className="home">
            <div className="card">
                Scores:
                <div>
                    {players ? players.map(player => <div>{player} | Hard-coded test score</div>) : <div></div>}
                </div>

                <button>New Lobby</button>
            </div>
        </main>
    );
};

export default EndingScreen
