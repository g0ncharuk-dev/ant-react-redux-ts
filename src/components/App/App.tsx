import * as React from "react";
import { Layout } from "antd";
import * as LayoutCustom from "@app/components/Layout/LayoutCustom";

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { test } from '@app/actions/index';

import "./App.less";

interface IPropsFromState {
  testVal: boolean
}
interface IPropsFromDispatch {
  testAction: () => void;
}
interface ITest {
  testVal: boolean
}

type AllProps = IPropsFromState & IPropsFromDispatch;


class App extends React.Component<AllProps> {
  constructor(props: AllProps) {
    super(props)

    this.handleTest= this.handleTest.bind(this)
    this.state = {}
  }

  public render() {
    console.log(this.props);
    const { testVal } = this.props;
    return (
      <Layout style={{ height: "100vh", overflowY: "scroll" }}>
        <LayoutCustom.Sider />
        <Layout>
          <LayoutCustom.Header />
          <LayoutCustom.Content>
            <div>
              {testVal + ' '}
              <button onClick={  this.handleTest }>|||</button>
            </div>
          </LayoutCustom.Content>
        </Layout>
      </Layout>
    );
  }

  private handleTest(event: React.MouseEvent<HTMLElement>) {
    this.props.testAction();
  }
}

const mapStateToProps = ({ testVal }: ITest) => {
  return { testVal }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    testAction: () => dispatch(test())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

