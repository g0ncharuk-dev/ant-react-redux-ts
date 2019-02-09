import * as React from "react";
import Map from "lodash/map";
import {Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';

import {MENU} from "@app/config/app";
import "./LayoutCustom.less";

const {SubMenu, ItemGroup} = Menu;

class Menus extends React.Component<any> {
    public getMenus(itemMenu: any) {
        const {location} = this.props;
        return Map(itemMenu, (item: any) => {
            if (item.subMenu) {
                return (
                    <SubMenu
                        key={item.id}
                        title={
                            <span>
                            {item.icon && <Icon type={item.icon}/>}
                                <span>{item.name}</span>
                        </span>
                        }>
                        {this.getMenus(item.subMenu)}
                    </SubMenu>
                );
            }
            if (item.itemGroup) {
                return (
                    <ItemGroup key={item.id} title={item.name}>
                        {this.getMenus(item.itemGroup)}
                    </ItemGroup>
                );
            }
            return (
                <Menu.Item key={item.id}
                           className={item.path && item.path === location.pathname ?
                               'ant-menu-item-selected' : ''}>
                    {item.path ?
                        <Link to={item.path}>
                            {item.icon && <Icon type={item.icon}/>}
                            <span>{item.name}</span>
                        </Link>
                        :
                        <>
                            {item.icon && <Icon type={item.icon}/>}
                            <span>{item.name}</span>
                        </>
                    }
                </Menu.Item>
            );
        });
    };

    public render() {
        return (
            <>
                <Menu mode={"inline"} theme={'light'}>
                    {this.getMenus(MENU)}
                </Menu>
            </>
        );
    }
}

export default Menus;
