import * as React from "react";
import {History} from 'history';
import {ConnectedRouter} from 'connected-react-router';
import {Route, Switch} from "react-router";
import {Auth, Protected} from "@app/pages";

import "./App.less";

interface IProps {
    history: History;
    sizes?: any
}

class App extends React.Component<IProps, any> {
    public render() {
        const {history} = this.props;
        return (
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact={true} path="/login" component={Auth}/>
                    <Route exact={false} path="/" component={Protected}/>
                </Switch>
            </ConnectedRouter>
        );
    }
}

export default App;

