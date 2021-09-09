import { db } from "../config/firebase";
import { useState, useEffect } from "react";
import { collection, doc, arrayUnion, updateDoc, getDoc } from "firebase/firestore";

export async function addPlayerToLobby(name, lobbyID){
    const lobbiesRef = collection(db, "lobbies");
    console.log(typeof lobbyID)
    console.log(lobbyID)

    const lobbyRef = doc(lobbiesRef, lobbyID);

    const lobbyInfo = await getDoc(lobbyRef);
    if (lobbyInfo.exists()) {
        await updateDoc(lobbyRef, {
            players: arrayUnion(name)
        });
    }
}
