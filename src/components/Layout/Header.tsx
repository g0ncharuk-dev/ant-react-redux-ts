import * as React from 'react';
import { Layout } from 'antd';

import './LayoutCustom.less';

const { Header } = Layout;

class HeaderCustom extends React.Component {
    public render() {
        return (
            <Header style={{ background: '#fff', height: '56px', padding: '0' }} />
        )
    }
}

export default HeaderCustom;
