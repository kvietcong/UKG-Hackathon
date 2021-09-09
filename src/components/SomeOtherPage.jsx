import { Context } from "../Context";
import React, { useContext, useState } from "react";
import { useParams } from "react-router";

const SomeOtherPage = () => {
    const { user } = useContext(Context);
    const {id} = useParams()
    const [name, setName] = useState("")

    return (
        <main className="home">
            <div className="card">
                Joining room "{id}"
                <div>Enter your name:</div>
                <input value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
                <button onClick={()=> {
                    console.log(`Entered game ${id} with name ${name}`)
                }}>Submit Name</button>
            </div>
        </main>
    );
};

export default SomeOtherPage;
