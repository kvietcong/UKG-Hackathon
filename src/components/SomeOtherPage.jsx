import { Context } from "../Context";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useLobby from "../hooks/useLobby";
import { addPlayerToLobby } from "../utils/addPlayerToLobby";

function nameAlreadyExistsInLobby(name, lobby){
    console.log(lobby)
    return (lobby?.players) ? lobby.players.includes(name) : false
}

const SomeOtherPage = () => {
    const { user } = useContext(Context);
    const history = useHistory()

    const {lobbyID} = useParams()
    const lobby = useLobby(lobbyID)
    useEffect(()=>{console.log(lobby)},[lobby])
    const [name, setName] = useState("")
    const chosenNameIsTaken = nameAlreadyExistsInLobby(name, lobby)

    // Need to change the conditional render from lobby to lobby == {}
    return (
        <main className="home">
            {lobby?
                <div className="card">
                    Joining room "{lobbyID}"
                    <div>Enter your name:</div>
                    <input value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
                    <button disabled={chosenNameIsTaken} onClick={()=> {
                        console.log(`Entered game ${lobbyID} with name ${name}`)
                        addPlayerToLobby(name, lobbyID)
                        history.push(`/${lobbyID}/lobby`)
                    }}>Submit Name</button>
                    {chosenNameIsTaken && <div>Name is taken, choose another!</div>}
                </div>
            : <div>Loading...</div>
            }
        </main>
    );
};

export default SomeOtherPage;
