import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";

// Retrieve and updates upon all lobbies (Map of Lobby IDs and actual info)
const useLobbies = () => {
    const [ lobbies, setLobbies ] = useState();

    useEffect(() => {
        const lobbiesRef = collection(db, "lobbies");
        const unsubscribe = onSnapshot(lobbiesRef, snapshot => {
            const newLobbies = {};
            snapshot.forEach(lobby => newLobbies[lobby.id] = lobby.data());
            setLobbies(newLobbies);
        });
        return unsubscribe;
    }, []);

    return lobbies;
};

export default useLobbies;
