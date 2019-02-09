import * as React from 'react';
import {Drawer} from 'antd';



class ActionDrawer extends React.Component<any> {
    public render() {
        const { onClose,visible,title,width } = this.props;
         return (
            <Drawer
                title={title}
                width={width}
                placement="right"
                onClose={onClose}
                maskClosable={true}
                visible={visible}
                style={{
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: 53,
                }}
            >
                {this.props.children}
            </Drawer>
        );
    }
}

export default ActionDrawer;




