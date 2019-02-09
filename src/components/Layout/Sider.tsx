import * as React from 'react';
import { Layout } from 'antd';

import Menus from '@app/components/Layout/Menu';
import Logo from '@app/components/Layout/Logo';

import './LayoutCustom.less';

const { Sider } = Layout;

class SiderCustom extends React.Component {
    public state = {
        collapsed: false,
    };

    public onCollapse = (collapsed:boolean) => {
        this.setState({ collapsed });
    };
    public render() {
        return (
            <Sider
                theme={'dark'}
                collapsible={true}
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}>
                <Logo />
                <Menus {...this.props} />
            </Sider>
        )
    }
}

export default SiderCustom;
