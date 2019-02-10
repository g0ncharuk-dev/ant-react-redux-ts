import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import {
    Dashboard,
    Test,
    Profile,
    Catalog,
    Setting
} from "@app/pages";

export class ProtectedRoute extends React.Component<any> {
    public render() {
        const { isAuth, componentCheck } = this.props;
        const pageCheck = () => {
            switch (componentCheck) {
                case 'dashboard': return <Dashboard {...this.props}/>;
                case 'products': return <Catalog.Products {...this.props}/>;
                case 'categories': return <Catalog.Categories {...this.props}/>;
                case 'filters': return <Catalog.Filters {...this.props}/>;
                case 'profile': return <Profile {...this.props}/>;
                case 'setting': return <Setting {...this.props}/>;
                case 'test': return <Test {...this.props}/>;
                default: return null
            }
        };

        if (isAuth) {
            return <Route {...this.props} component={pageCheck} />
        } else {
            return <Redirect to={{pathname: '/login',state: { from: this.props.location }}
            } />
        }
    }
}