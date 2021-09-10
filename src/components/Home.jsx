import { Context } from "../Context";
import React, { useContext, useState } from "react";
import "./Home.css"
import { useHistory } from "react-router";

function handleJoinGame(roomCode, history) {
    // Do stuff with roomCode
    console.log("Joining room:"+ roomCode)
    history.push(`/${roomCode}`)
}

const Home = () => {
    const { user } = useContext(Context);
    const [roomCode, setRoomCode] = useState("3Chx4mN0R7pglAKUtEh7")
    const history = useHistory()

    return (
        <main className="home">
            <div className="card">
                <div id="letsPlayText">Let's play...</div>
                <h1 id="title">Deception 🕵️‍♂️</h1>
                <b>Use room code:</b>
                <div>
                    <input value={roomCode} onChange={(e)=>setRoomCode(e.currentTarget.value)} />
                    <button onClick={()=> {
                        handleJoinGame(roomCode, history)
                    }}>Join Game</button>
                </div>
                <b>or</b>
                <button onClick={()=>console.log("Tried to create new game")}>Create a new Game & Copy Link</button>
            </div>
        </main>
    );
};

export default Home;
