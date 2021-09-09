import { Context } from "../Context";
import React, { useContext } from "react";

const Home = () => {
    const { user } = useContext(Context);

    return (
        <main className="home">
            <h1>Hello WORLD!</h1>
        </main>
    );
};

export default Home;
