import useLobby from "../hooks/useLobby";
import { startLobby } from "../utils/startLobby";
import { addChoices } from "../utils/addChoices";
import { getPoints, getNotSelected, getSelected, isReadyForNextRound, hasPlayerSelected, lazyLoad, getVsPoints } from "../utils/general";
import useLobbies from "../hooks/useLobbies";

const testID = "3Chx4mN0R7pglAKUtEh7";

const Test = () => {
    const lobby = useLobby(testID);
    const lobbies = useLobbies();
    return (
        <main className="test">
            <h2>{testID} Specific Things</h2>
            <button onClick={() => console.log(getPoints(lobby))}>Log Points</button>
            <button onClick={() => console.log(getNotSelected(lobby))}>Log Players Not Selected</button>
            <button onClick={() => console.log(getSelected(lobby))}>Log Players Selected</button>
            <button onClick={() => console.log(isReadyForNextRound(lobby))}>Log Ready for Next Round</button>
            <button onClick={() => console.log(getVsPoints(lobby,
                document.getElementById("p1").value, document.getElementById("p2").value))}
            >
                Get Vs points
                <input id="p1" type="text"/>
                <input id="p2" type="text"/>
            </button>
            <button onClick={() =>
                addChoices("1", {2: "CHEAT", 3: "CHEAT"}, "3Chx4mN0R7pglAKUtEh7")}
            >
                Add Choices
            </button>
            <button onClick={() => startLobby(testID)}>Start Lobby</button>
            <button onClick={() => startLobby(testID, false)}>End Lobby</button>
            <ul>
                <li>Points: {lazyLoad(lobby, getPoints)}</li>
                <li>Selected: {lazyLoad(lobby, getSelected)}</li>
                <li>Not Selected Yet: {lazyLoad(lobby, getNotSelected)}</li>
                <li>Ready for Next Round: {lazyLoad(lobby, isReadyForNextRound)}</li>
                <li>Round: {lazyLoad(lobby, (l) => l.rounds.length)}</li>
                <li>Game Has Started: {lazyLoad(lobby, (l) => l.hasStarted)}</li>
                <li>Max Rounds: {lazyLoad(lobby, (l) => l.maxRounds)}</li>
            </ul>
            <ul>
                {lobby ? lobby.players.map(player => <li key={player}>
                    {player} Has Selected? {JSON.stringify(hasPlayerSelected(lobby, player))}
                </li>) : <li>Loading</li>}
            </ul>
            <h2>All Lobbies</h2>
            <button onClick={() => console.log(lobbies)}>Log All Lobbies</button>
            <ul>
                {lobbies ? Object.keys(lobbies).map(lobby => <li key={lobby}>
                    <p>ID: {JSON.stringify(lobby)}</p>
                    <p>Players: {lobbies[lobby].players.length}</p>
                    <p>Has started? {lobbies[lobby].hasStarted ? "Yes" : "No"}</p>
                </li>) : <li>Loading</li>}
            </ul>
        </main>
    );
};

export default Test;
