import {config as api} from '@app/config/api'

const configMenu: any = [
    {
        id: 0,
        name: "Dashboard ",
        icon: "dashboard",
        path: "/",
        page: "dashboard"
    }, {
        id: 1,
        name: "Каталог ",
        icon: "shopping-cart",
        subMenu: [
            {id: 5, name: "Товары", path: "/catalog/products", page: "products", icon: ""},
            {id: 6, name: "Категории", path: "/catalog/categories", page: "categories", icon: ""},
            {id: 7, name: "Фильтры", path: "/catalog/filters", page: "filters", icon: ""}
        ]
    },
    // {
    //     id: 1,
    //     name: "Item ",
    //     icon: "setting",
    //     path: "/test1",
    //     page: "test",
    //     exact: true,
    //     subMenu: [
    //         {
    //             id: 9,
    //             name: "Item",
    //             itemGroup: [
    //                 {id: 5, name: "Item", icon: "star"},
    //                 {id: 6, name: "Item", icon: "heart"}
    //             ]
    //         }
    //     ]
    // },
    // {
    //     id: 4,
    //     name: "Item",
    //     icon: "trophy",
    //     path: "/test",
    //     schema: "test",
    //     page: false,
    //     subMenu: [
    //         {
    //             id: 7,
    //             name: "Item",
    //             icon: "cloud-upload",
    //             subMenu: [{id: 8, name: "Item", icon: "radar-chart"}]
    //         }
    //     ]
    // }
];

export const configApi: any = {
    auth: api.API_DOMAIN + 'auth',
    getFilters: api.API_DOMAIN + 'filter/list',
    createFilter: api.API_DOMAIN + 'filter/store',
    updateFilter: api.API_DOMAIN + 'filter/update',
    deleteFilter: api.API_DOMAIN + 'filter/delete',
};

export default configMenu;