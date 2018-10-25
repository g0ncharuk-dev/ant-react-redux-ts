import * as React from 'react';
import {Layout} from 'antd';

import './LayoutCustom.less';

const {Content} = Layout;

class ContentCustom extends React.Component<any, any> {
    public render() {
        return (
            <Content style={{margin: '10px'}}>
                {this.props.children}
            </Content>
        )
    }
}

export default ContentCustom;