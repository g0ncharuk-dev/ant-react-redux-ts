import * as React from "react";
// import { Redirect } from "react-router-dom";
import { Layout, Row, Col, Card, Form, Icon, Input, Button, Alert  } from "antd";
import axios from "axios";

import { API } from "@app/config/app";
import "@app/pages/Auth/Auth.less";

const logo = "/static/images/logo.svg";

const  FormItem = Form.Item;

interface IProps {
    isAuthorized: boolean;
}

export class Auth extends React.Component<any, any> {
    constructor(props: IProps) {
        super(props);

        // const storage: any = localStorage.getItem("isAuth");
        this.setState({
            isAuthorized: window.localStorage.getItem("isAuth")
        })
    }
    public componentWillReceiveProps(nextProps:any) {
        console.log(this.state.isAuthorized )
    }

    public render() {
        console.log(this.state.isAuthorized );
        const { getFieldDecorator } = this.props.form;

        return (
        
            <div className={"auth__page"}>
                <Row>
                    <Col span={12}>
                        <Layout>
                            <div className={"auth__greeting"}>
                                <div className={"auth__description"}>
                                    <h1>Welcome to</h1>
                                    <img alt="logo" src={logo} width={80} />
                                    <h2>Lorem ipsum dolor</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </div>
                                <div className={"auth__made_by"}>
                                    by <a href="#">g0ncharuk</a> code
                                </div>
                            </div>
                        </Layout>
                    </Col>
                    <Col span={12}>
                        <Layout>
                            <div className={"auth__form"}>
                             <Card>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div>
                            <h1>Login</h1>
                        </div>
                        <FormItem>
                            {getFieldDecorator("email", {
                                rules: [
                                    {
                                        required: true,
                                        message: "Please input your login! example: Guest"
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="user"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    placeholder="Login"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message:
                                            "Please input your Password! example: Guest"
                                    }
                                ]
                            })(
                                <Input
                                    prefix={
                                        <Icon
                                            type="lock"
                                            style={{ color: "rgba(0,0,0,.25)" }}
                                        />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
     
                <Card>
                    <Alert
                        message="Informational Notes"
                        description="Additional description and informations about copywriting."
                        type="info"
                        showIcon={true}
                    />
                    <Button className={"auth__alert_btn"} block={true}>
                        Go to main page
                    </Button>
                </Card>
                            </div>
                        </Layout>
                    </Col>
                </Row>
            </div>
        );
    }

    private handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields(
            (err: any, data: { email: string; password: string }) => {
                if (!err) {
                    axios({
                        method: "post",
                        url: API.auth,
                        data: {
                            email: data.email,
                            password: data.password
                        }
                    }).then(res => {
                        if (res && res.status === 200) {
                            localStorage.setItem("isAuth", "true");

                        }
                    });
                }
            }
        );
    };
}
const Wrapped = Form.create()(Auth);

export default Wrapped;

