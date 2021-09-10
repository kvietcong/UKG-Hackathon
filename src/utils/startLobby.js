import { db } from "../config/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export async function startLobby(lobbyID, newState = true) {
    const lobbiesRef = collection(db, "lobbies");
    const lobbyRef = doc(lobbiesRef, lobbyID);
    const lobbyInfo = await getDoc(lobbyRef);

    if (lobbyInfo.exists()) {
        const lobby = lobbyInfo.data();
        const newLobby = {...lobby};
        newLobby.hasStarted = newState;
        await setDoc(lobbyRef, newLobby);
    }
}