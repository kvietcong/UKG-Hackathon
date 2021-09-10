import { Context } from "../Context";
import React, { useContext, useState, useEffect } from "react";
import useLobby from "../hooks/useLobby";
import { addChoices } from "../utils/addChoices";
import { useParams } from "react-router-dom";
import { getPoints, getVsPoints } from "../utils/general";

/**
 * The Main Game Page where decisions of CHEAT/COOPERATE are made each round
 */
const DecisionsList = () => {
    const { user } = useContext(Context);
    const { lobbyID } = useParams();
    const [choices, setChoices] = useState({}); // {playerName: decisionTowardsPlayer}
    const lobby = useLobby(lobbyID);

    useEffect(()=>{
        let emptyChoices = lobby ?
            lobby.players.reduce((acc,curr)=> (acc[curr]="", acc),{}) : {}
        emptyChoices = {...emptyChoices, ...choices};
        setChoices(emptyChoices);
    },[]);

    function handleDecisionsSubmit() {
        if (Object.values(choices).indexOf("") >= 0) {
            console.log("Make a decision for all players!")
            return
        }
        console.log("Submitting Decisions: ", choices, lobbyID, user)
        addChoices(user, choices, lobbyID)
    }

    function handleChoice(otherPlayer, choice) {
        const newChoices = {...choices};
        newChoices[otherPlayer] = choice
        setChoices(newChoices);
    }

    function getMyScore(player, opponent) {
        return (lobby ? getVsPoints(lobby, player, opponent) : 0)
    }

    function getOtherScore(player, opponent) {
        return (lobby ? getVsPoints(lobby, opponent, player) : 0)
    }

    function createDecisionRow (player) {
        if(player === user) {
            return <br/>
        }

        return (
            <li key={player}>
                vs. {player} {getMyScore(player)} {getOtherScore(player)}
                <button onClick={() => handleChoice(player, "COOPERATE")}>COOPERATE</button>
                <button onClick={() => handleChoice(player, "CHEAT")}>CHEAT</button>
            </li>
        )
    }

    return (
        <main className="player-list">
            <h1>Round {lobby?.rounds?.length ?? 1}</h1>
            <br/>
            <h1>You are {user} with {lobby ? getPoints(lobby)[user] : "(Loading)"} Points</h1>
            <ul>
                {lobby && lobby.players ?
                    lobby.players.map(player => createDecisionRow(player)) : <br/>}
            </ul>
            <button onClick={() => handleDecisionsSubmit()}>Submit</button>
        </main>
    );
};

export default DecisionsList;
