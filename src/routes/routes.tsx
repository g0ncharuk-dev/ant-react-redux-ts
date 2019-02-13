import * as React from 'react';
import {Route, Switch} from "react-router-dom";
import authUtil from '@app/utils/localStorage';

import {ProtectedRoute} from "@app/components/ProtectedRoute";
import {NoMatch} from "@app/pages";


class Routes extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            height: 280,
        };
    }

    public componentWillReceiveProps(nextProps: any) {
        if (nextProps.size !== this.props.size) {
            this.setState(
                {
                    height: nextProps.size,
                }
            );
        }
    }

    public render() {
        const isAuth = authUtil.get('isAuth');
        return (
            <Switch>
                <ProtectedRoute exact={true} path='/' isAuth={isAuth} componentCheck={'dashboard'}/>
                <ProtectedRoute exact={true} path='/catalog/products' isAuth={isAuth} componentCheck={'products'}/>
                <ProtectedRoute exact={true} path='/catalog/categories' isAuth={isAuth} componentCheck={'categories'}/>
                <ProtectedRoute exact={true} height = {this.state.height} path='/catalog/filters' isAuth={isAuth} componentCheck={'filters'}/>
                <ProtectedRoute exact={true} path='/profile' isAuth={isAuth} componentCheck={'profile'}/>
                <ProtectedRoute exact={true} path='/setting' isAuth={isAuth} componentCheck={'setting'}/>
                <ProtectedRoute exact={true} path='/test' isAuth={isAuth} componentCheck={'test'}/>
                <Route exact={true} component={NoMatch}/>
            </Switch>
        );
    }
}

export default Routes