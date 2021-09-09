import useLobby from "../hooks/useLobby";

const Test = () => {
    const lobby = useLobby("3Chx4mN0R7pglAKUtEh7");
    return (
        <main className="test">
            <button onClick={() => console.log(lobby)}>Hi</button>
        </main>
    );
};

export default Test;
