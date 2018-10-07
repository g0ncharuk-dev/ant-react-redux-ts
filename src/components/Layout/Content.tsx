import * as React from 'react';
import { Layout } from 'antd';

import './LayoutCustom.less';

const { Content } = Layout;

class ContentCustom extends React.Component {
    public render() {
        return (
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                {this.props.children}
            </Content>
        )
    }
}

export default ContentCustom;