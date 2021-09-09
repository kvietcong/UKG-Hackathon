import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";

const useLobby = (lobbyID) => {
    const [ lobby, setLobby ] = useState({});

    useEffect(() => {
        const lobbiesRef = collection(db, "lobbies")
        const lobbyRef = doc(lobbiesRef, lobbyID)
        const unsubscribe = onSnapshot(lobbyRef, (lobby) => {
            setLobby(lobby.data());
        });
        return unsubscribe;
    }, [ lobbyID ]);

    return lobby;
};

export default useLobby;
