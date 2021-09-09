import React from "react";
import { ContextProvider } from "./Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import SomeOtherPage from "./components/SomeOtherPage";
import Lobby from "./components/LobbyPage";

function App() {
    return (
        <div className="App">
            <ContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/:id" component={SomeOtherPage}/>
                        <Route exact path="/:id/lobby" component={Lobby}/>
                    </Switch>
                </Router>
            </ContextProvider>
        </div>
    );
};

export default App;
