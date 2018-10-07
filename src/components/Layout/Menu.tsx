import * as React from "react";
import Map from "lodash/map";
import { Menu, Icon } from 'antd';

import cofigMenu from "@app/config/app/index";
import "./LayoutCustom.less";

const { SubMenu, ItemGroup } = Menu;

const getMenus = (itemMenu: any) => {
  return Map(itemMenu, (item: any) => {
    if (item.subMenu) {
      return (
        <SubMenu
          key={item.id}
          title={
            <span>
              {item.icon && <Icon type={item.icon} />}
              <span>{item.name}</span>
            </span>
          }
        >
          {getMenus(item.subMenu)}
        </SubMenu>
      );
    }
    if (item.itemGroup) {
      return (
        <ItemGroup key={item.id} title={item.name}>
          {getMenus(item.itemGroup)}
        </ItemGroup>
      );
    }
    return (
      <Menu.Item key={item.id}>
        {item.icon && <Icon type={item.icon} />}
        <span>{item.name}</span>
      </Menu.Item>
    );
  });
};

const menuItems = getMenus(cofigMenu);

class Menus extends React.Component {
  public render() {
    return (
      <>
        <Menu mode={"inline"} theme={"dark"}>
          {menuItems}
        </Menu>
      </>
    );
  }
}

export default Menus;
