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
    const [roomCode, setRoomCode] = useState("")
    const history = useHistory()

    return (
        <main className="home">
            <div className="card">
                <div>Enter code:</div>
                <div>
                    <input value={roomCode} onChange={(e)=>setRoomCode(e.currentTarget.value)}/>
                    <button onClick={()=> {
                        handleJoinGame(roomCode, history)
                    }}>Join Game</button>
                </div>
                <button onClick={()=>console.log("Tried to create new game")}>Create a new Game & Copy Link</button>
            </div>
        </main>
    );
};

export default Home;
