import { Context } from "../Context";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useLobby from "../hooks/useLobby";
import { addPlayerToLobby } from "../utils/addPlayerToLobby";

function nameAlreadyExistsInLobby(name, lobby){
    console.log(lobby)
    return (lobby?.players) ? lobby.players.includes(name) : false
}

const NameSelectionPage = () => {
    const { setUser } = useContext(Context);
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
                    <b>Joining room "{lobbyID}"</b>
                    <div>Enter your name 😎:</div>
                    <div>
                        <input placeholder="e.x., SuperSpyGal99" value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
                        <button disabled={chosenNameIsTaken} onClick={()=> {
                            console.log(`Entered game ${lobbyID} with name ${name}`)
                            setUser(name)
                            addPlayerToLobby(name, lobbyID)
                            history.push(`/${lobbyID}/lobby`)
                        }} >Submit Name</button>
                    </div>
                    {chosenNameIsTaken && <div style={{color:"rgb(153, 153, 255)"}}>Name is taken, choose another!</div>}
                </div>
            : <div>Loading...</div>
            }
        </main>
    );
};

export default NameSelectionPage;
