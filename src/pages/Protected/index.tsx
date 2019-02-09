import * as React from 'react';
import ReactDOM from "react-dom";
import {Layout} from 'antd';
import * as LayoutCustom from '@app/components/Layout';
import Routes from '@app/routes/routes';

class Protected extends React.Component<any, any> {
    private readonly refHeight: React.RefObject<any>;

    constructor(props: any) {
        super(props);
        this.refHeight = React.createRef();
        this.state = {
            nodeHeight: 280,
        };
    }

    public componentDidMount() {
        const node: any = ReactDOM.findDOMNode(this.refHeight.current);
        if (node) {
            setTimeout(() => {
                this.setState(
                    {
                        nodeHeight: node.clientHeight
                    }
                )
            })
        }
    }

    public render() {
        return (
            <div>
                <Layout style={{height: "100vh", overflowY: "scroll"}}>
                    <LayoutCustom.Sider {...this.props}/>
                    <Layout>
                        <LayoutCustom.Header/>
                        <LayoutCustom.Content ref={this.refHeight}>
                            <Routes size = {this.state.nodeHeight}/>
                        </LayoutCustom.Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Protected;