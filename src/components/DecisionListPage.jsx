import { Context } from "../Context";
import React, { useContext, useState } from "react";

/**
 * The Main Game Page where decisions of CHEAT/COOPERATE are made each round
 */
const DecisionsList = () => {
    const { user, roundNum } = useContext(Context);
    const [playerList, setPlayerList] = useState(["A", "B"])

    function getMyScore(player) {return 0;}
    function getOtherScore(player) {return 0;}

    return (
        <main className="player-list">
            <h1>Round {roundNum}</h1>
            <br/>
            <h1>You ({user})</h1>
            <ul>
                {playerList.map(player => 
                        <li key={player}>vs. {player} {getMyScore(player)} {getOtherScore(player)} <button>COOPERATE</button><button>CHEAT</button> </li>
                )}
            </ul>
            <button>Submit</button>
        </main>
    );
};

export default DecisionsList;
