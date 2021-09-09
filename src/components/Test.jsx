import useLobby from "../hooks/useLobby";
import { addChoices } from "../utils/addChoices";
import { getPoints, getNotReady, getReady, getRound } from "../utils/general";

const Test = () => {
    const lobby = useLobby("3Chx4mN0R7pglAKUtEh7");
    return (
        <main className="test">
            <button onClick={() => console.log(getPoints(lobby))}>Log Points</button>
            <button onClick={() => console.log(getNotReady(lobby))}>Log Not Ready</button>
            <button onClick={() => console.log(getReady(lobby))}>Log Ready</button>
            <button onClick={() => console.log(getRound(lobby))}>Log Round</button>
            <button onClick={() =>
                addChoices("1", {2: "CHEAT", 3: "CHEAT"}, "3Chx4mN0R7pglAKUtEh7")}
            >
                Add Choices
            </button>
        </main>
    );
};

export default Test;
