import * as React from "react";
import { Redirect } from "react-router-dom";
import { Layout, Row, Col, Card, Form, Icon, Input, Button } from "antd";
import axios from "axios";

import { API } from "@app/config/app";
import localStorageHelper from "@app/utils/localStorage";
import "@app/pages/Auth/Auth.less";

const logo = "/static/images/logo.svg";
const FormItem = Form.Item;

interface IProps {
    isAuthorized: boolean;
}

export class Auth extends React.Component<any, any> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            redirectToReferrer: false
        }
    }

    public componentWillUnmount () {
        this.setState(() => ({
            redirectToReferrer: false
        })) 
    }

    public render() {
        const { getFieldDecorator } = this.props.form;
        const { redirectToReferrer } = this.state

        const isAuth: boolean = JSON.parse(localStorageHelper.get('isAuth'));
        const checkAuth = (auth: boolean) => {
            if (auth) {
                return (
                    <Redirect to="/" />
                )
            }
            return (<Card>
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
                        <Button htmlType="submit" type="primary" className="login-form-button">
                            Log in
                                            </Button>
                    </FormItem>
                </Form>
            </Card>)
        }

        if (redirectToReferrer === true) {
            return <Redirect to='/' />
        }

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
                                {checkAuth(isAuth)}
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
                    }).then((res: any) => {
                        if (res && res.status === 200) {
                            localStorageHelper.set('isAuth', true, true);
                            localStorageHelper.set('TOKEN_KEY', res.data, true);


                            this.setState(() => ({
                                redirectToReferrer: true
                            }))
                        }
                    });
                }
            }
        );
    };
}
const Wrapped = Form.create()(Auth);

export default Wrapped;

