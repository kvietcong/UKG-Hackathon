import { Context } from "../Context";
import React, { useContext, useState } from "react";
import "./Home.css"

function handleSelectName(roomCode, history) {
    // Do stuff with roomCode
    console.log(roomCode)
    history.push(`/${roomCode}/lobby`)
}

const Home = () => {
    const { user } = useContext(Context);
    const [name, setName] = useState("")
    const history = useHistory()

    return (
        <main className="home">
            <div className="card">
                <div>Enter your name:</div>
                <input value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
                <button onClick={()=> {
                    handleSelectName(roomCode, history)
                }}>Join Game</button>
            </div>
        </main>
    );
};

export default Home;
