import { config as api } from '@app/config/api'
const cofigApp: any = [
  {
    id: 0, name: "Item ",
    icon: "dashboard",
    path: "/",
    page: "dashboard"
  },
  {
    id: 1,
    name: "Item ",
    icon: "setting",
    path: "/test1",
    page: "test",
    exact: true,
    subMenu: [
      {
        id: 9,
        name: "Item",
        itemGroup: [
          { id: 5, name: "Item", icon: "star" },
          { id: 6, name: "Item", icon: "heart" }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Item",
    icon: "trophy",
    path: "/test",
    schema: "test",
    page: false,
    subMenu: [
      {
        id: 7,
        name: "Item",
        icon: "cloud-upload",
        subMenu: [{ id: 8, name: "Item", icon: "radar-chart" }]
      }
    ]
  }
];

export const configApi:any = {
    auth: api.API_DOMAIN + 'auth'
};

export default cofigApp;