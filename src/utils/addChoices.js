import { getRound } from "./general";
import { db } from "../config/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function addChoices(player, choices, lobbyID) {
    const lobbiesRef = collection(db, "lobbies");
    const lobbyRef = doc(lobbiesRef, lobbyID);
    const lobbyInfo = await getDoc(lobbyRef);

    if (lobbyInfo.exists()) {
        const lobby = lobbyInfo.data();
        const currentRound = getRound(lobby) - 1;
        const newRounds = [...lobby.rounds];

        if (!newRounds[currentRound]) newRounds[currentRound] = {};
        newRounds[currentRound][player] = choices;

        const newLobby = {
            players: lobby.players,
            rounds: newRounds,
        };

        await setDoc(lobbyRef, newLobby);
    }
}