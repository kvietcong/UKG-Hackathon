import { Context } from "../Context";
import React, { useContext, useState, useEffect } from "react";
import useLobby from "../hooks/useLobby";
import { addChoices } from "../utils/addChoices";
import { useParams } from "react-router-dom";
import { getPoints, getVsPoints } from "../utils/general";
import "./Home.css"
import "./DecisionListPage.css"

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
            return null;
        }

        return <tr key={player}>
            <td>{player}</td>
            <td>{getMyScore(player)}</td>
            <td>{getOtherScore(player)}</td>
            <button class="decisionButton" onClick={() => handleChoice(player, "COOPERATE")} style={{backgroundColor: choices[player] === "COOPERATE" && "lightgreen"}}>🤝</button>
            <button class="decisionButton" onClick={() => handleChoice(player, "CHEAT")} style={{backgroundColor: choices[player] === "CHEAT" && "lightcoral"}}>🦹‍♂️</button>
        </tr>
    }

    return (
        <main className="home">
            <div class="card">
                <h1 style={{margin: 0}}>Round {lobby?.rounds?.length + 1 ?? 1} 🔎</h1>
                <h2>You are {user} with {lobby ? getPoints(lobby)[user] : "(Loading)"} Points</h2>
                <table>
                    <th>{/* Empty */}</th>
                    <th><abbr title="Your Score">You</abbr></th>
                    <th><abbr title="Their Score">Them</abbr></th>
                    {lobby && lobby.players ? lobby.players.map(player => createDecisionRow(player)) : null}
                </table>
                <button onClick={()=> handleDecisionsSubmit()}>Submit</button>
            </div>
        </main>
    );
};

export default DecisionsList;
