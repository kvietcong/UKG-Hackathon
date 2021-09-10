import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { collection, doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";

const useLobby = (lobbyID, defaultRounds = 8) => {
    const [ lobby, setLobby ] = useState();
    const [ exists, setExists ] = useState(false);

    useEffect(() => {
        const lobbiesRef = collection(db, "lobbies");
        const lobbyRef = doc(lobbiesRef, lobbyID);
        const seeExistAndCreate = async () => {
            const lobbyInfo = await getDoc(lobbyRef);
            if (!lobbyInfo.exists()) {
                await setDoc(lobbyRef, {
                    hasStarted: false, players: [], rounds: [], maxRounds: 8
                });
            }
            setExists(true);
        }
        if (!exists) {
            seeExistAndCreate();
        } else {
            const unsubscribe = onSnapshot(lobbyRef, lobby => {
                setLobby(lobby.data());
            });
            return unsubscribe;
        }
    }, [ lobbyID, exists ]);

    return lobby;
};

export default useLobby;
