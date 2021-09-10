import { Context } from "../Context";
import React, { useContext, useState, useEffect } from "react";
import useLobby from "../hooks/useLobby";
import { addChoices } from "../utils/addChoices";
import { useParams } from "react-router-dom";

/**
 * The Main Game Page where decisions of CHEAT/COOPERATE are made each round
 */
const DecisionsList = () => {
    const {user, roundNum } = useContext(Context);
    const {lobbyID} = useParams()
    const [players, setPlayers] = useState([])
    const [myChoices, setMyChoices] = useState({}) // {playerName: decisionTowardsPlayer}
    const lobby = useLobby("3Chx4mN0R7pglAKUtEh7")

    useEffect(() => {
        setPlayers(lobby ? lobby.players : [])
    }, [lobby])

    function getMyScore(player) {return 0;}
    function getOtherScore(player) {return 0;}
    function handleDecisionsSubmit() {
        addChoices(user, myChoices, lobbyID)
    }
    function handleChoice(otherPlayer, choice) {
        myChoices[otherPlayer] = choice
        setMyChoices(myChoices)
    }

    function createDecisionRow (player) {

        //Currently "user" is "Default", trying to fix that
        console.log(player)
        console.log(user)
        if(player == user) {
            return <br/>
        }

        return <li key={player}>
            vs. {player} {getMyScore(player)} {getOtherScore(player)} 
            {/* <button onClick={handleChoice(player, "COOPERATE")}>COOPERATE</button>
            <button onClick={handleChoice(player, "CHEAT")}>CHEAT</button>  */}
        </li>
    }
    return (
        <main className="player-list">
            <h1>Round {roundNum}</h1>
            <br/>
            <h1>You ({user})</h1>
            <ul>
                {players ? players.map(player => createDecisionRow(player)) : <br/>}
            </ul>
            <button onClick={()=> handleDecisionsSubmit()}>Submit</button>
        </main>
    );
};

export default DecisionsList;
