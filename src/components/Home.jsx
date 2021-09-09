import { Context } from "../Context";
import React, { useContext } from "react";

const Home = () => {
    const { user } = useContext(Context);

    return (
        <main className="home">
            <button>Create a new Game & Copy Link</button>
            <div></div>
            <input />
        </main>
    );
};

export default Home;
