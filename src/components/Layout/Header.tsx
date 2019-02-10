import * as React from 'react';
import {
    Layout, Avatar, Menu, Dropdown,
    Row, Badge, Icon, Popover, Button
} from 'antd';


import './LayoutCustom.less';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to={'/profile'} style={{ textAlign: 'center' }}>
                <Icon type={'user'} />
                Profile
            </Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to={'/setting'} style={{ textAlign: 'center' }}>
                <Icon type={'setting'} />
                Setting
            </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
            <Button htmlType="submit" type="primary" style={{ width: '100%' }}>
                Log out
            </Button>
        </Menu.Item >
    </Menu>
);

const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
        <p>Content</p>
    </div>
);

const username = 'Admin Admin'

class HeaderCustom extends React.Component {
    public render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }}>
                <Row className="ant-profile" type="flex" justify="space-between" align="middle">
                    <a className="ant-dropdown-link" target='_blank' href="#">Открыть сайт<Icon type="right" /></a>
                    <span style={{ flex: 1 }} />
                    <Popover content={content} title="Title" trigger="click">
                        <Badge className="header-icon" dot={true}>
                            <a href="#">
                                <Icon type="notification" />
                            </a>
                        </Badge>
                    </Popover>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                style={{ verticalAlign: 'middle', marginRight: '15px' }}>{username}
                            </Avatar>
                            {username}
                            <Icon type="down" />
                        </a>
                    </Dropdown>
                </Row>
            </Header>
        )
    }
}

export default HeaderCustom;
