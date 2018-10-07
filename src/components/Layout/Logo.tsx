import * as React from 'react';
import './LayoutCustom.less';

const logo = '/static/images/logo.svg';
class Sider extends React.Component {
    public render() {
        return (
            <div className={'logo dark'}>
                <img alt="logo" src={logo} />
            </div>
        )
    }
}

export default Sider;