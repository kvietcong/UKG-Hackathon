import { isReadyForNextRound } from "./general";
import { db } from "../config/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

// Choices only add onto a new round when it is ready to do so. If not
// you keep on overwriting your old choices.
// You can detect if addChoices will add towards a new round if you
// use the `isReadyForNextRound` function from utils.
export async function addChoices(player, choices, lobbyID) {
    const lobbiesRef = collection(db, "lobbies");
    const lobbyRef = doc(lobbiesRef, lobbyID);
    const lobbyInfo = await getDoc(lobbyRef);

    if (lobbyInfo.exists()) {
        const lobby = lobbyInfo.data();
        const currentRound = lobby.rounds.length
            - (isReadyForNextRound(lobby) ? 0 : 1);
        console.log(currentRound, lobby.rounds.length, isReadyForNextRound(lobby));
        const newRounds = [...lobby.rounds];

        if (!newRounds[currentRound]) newRounds[currentRound] = {};
        newRounds[currentRound][player] = choices;

        const newLobby = {...lobby};
        newLobby.rounds = newRounds;

        await setDoc(lobbyRef, newLobby);
    }
}