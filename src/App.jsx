import React from "react";
import { ContextProvider } from "./Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Test from "./components/Test";
import SomeOtherPage from "./components/SomeOtherPage";
import EndingScreen from "./components/EndingScreen"

function App() {
    return (
        <div className="App">
            <ContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/ending" component={EndingScreen}/>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/Test" component={Test}/>
                        <Route exact path="/:id" component={SomeOtherPage}/>                    
                    </Switch>
                </Router>
            </ContextProvider>
        </div>
    );
};

export default App;
