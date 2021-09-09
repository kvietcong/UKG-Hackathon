import { Context } from "../Context";
import React, { useContext } from "react";
import { useParams } from "react-router";

const SomeOtherPage = () => {
    const { user } = useContext(Context);
    const {id} = useParams()

    return (
        <main className="home">
            This is my other component, we're accessing game with ID: {id}
        </main>
    );
};

export default SomeOtherPage;
