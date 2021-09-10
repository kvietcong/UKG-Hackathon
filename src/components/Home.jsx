import { Context } from "../Context";
import React, { useContext, useState } from "react";
import "./Home.css"
import { useHistory } from "react-router";

import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

function handleJoinGame(roomCode, history) {
    // Do stuff with roomCode
    console.log("Joining room:"+ roomCode)
    history.push(`/${roomCode}`)
}

async function createNewLobby() {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "lobbies"), {
        hasStarted: false,
        maxRounds: 5,
        players: [],
        rounds: []
    });

    return docRef.id
}

const Home = () => {
    const { user } = useContext(Context);
    const [roomCode, setRoomCode] = useState("")
    const history = useHistory()

    return (
        <main className="home">
            <div className="card">
                <div id="letsPlayText">Let's play...</div>
                <h1 id="title">Deception 🕵️‍♂️</h1>
                <b>Use room code:</b>
                <div>
                    <input placeholder="Enter Room ID Here" value={roomCode} onChange={(e)=>setRoomCode(e.currentTarget.value)} />
                    <button onClick={()=> {
                        handleJoinGame(roomCode, history)
                    }}>Join Game</button>
                </div>
                <b>or</b>
                <button onClick={() => createNewLobby().then(id => setRoomCode(id))}>Create a New Game (enters ID in box)</button>
            </div>
        </main>
    );
};

export default Home;
