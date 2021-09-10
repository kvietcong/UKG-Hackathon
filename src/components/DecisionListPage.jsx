import { Context } from "../Context";
import React, { useContext, useState, useEffect } from "react";
import useLobby from "../hooks/useLobby";
import { addChoices } from "../utils/addChoices";
import { useParams } from "react-router-dom";
import { getPoints, getVsPoints } from "../utils/general";

let decisions = {}
/**
 * The Main Game Page where decisions of CHEAT/COOPERATE are made each round
 */
const DecisionsList = () => {
    const {user, roundNum } = useContext(Context);
    const {lobbyID} = useParams()
    const [players, setPlayers] = useState([])
    const [myChoices, setMyChoices] = useState({}) // {playerName: decisionTowardsPlayer}
    //const [scores, setScores] = useState([])
    const lobby = useLobby("3Chx4mN0R7pglAKUtEh7")

    useEffect(()=>{
        decisions = lobby ? lobby.players.reduce((acc,curr)=> (acc[curr]='',acc),{}) : {}
    },[])

    useEffect(() => {
        setPlayers(lobby ? lobby.players : [])
    }, [lobby])

    function handleDecisionsSubmit() {
        if (Object.values(decisions).indexOf("") >= 0) {
            console.log("Make a decision for all players!")
            return
        }
        console.log("Submitting Decisions: ", decisions)
        addChoices(user, decisions, lobbyID)
    }

    function handleChoice(otherPlayer, choice) {
        decisions[otherPlayer] = choice
    }

    function getMyScore(player, opponent) {
        return (lobby ? getVsPoints(lobby, player, opponent) : 0)
    }

    function getOtherScore(player, opponent) {
        return (lobby ? getVsPoints(lobby, opponent, player) : 0)
    }

    function createDecisionRow (player) {
        if(player == user) {
            return <br/>
        }

        return <li key={player}>
            vs. {player} {getMyScore(player)} {getOtherScore(player)} 
            <button onClick={handleChoice(player, "COOPERATE")}>COOPERATE</button>
            <button onClick={handleChoice(player, "CHEAT")}>CHEAT</button> 
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
