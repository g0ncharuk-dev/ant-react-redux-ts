import {config as api} from '@app/config/api';

export const MENU: any = [
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
    }
];

export const NOTIFICATION: any = {
    getError: {
        type:'error',
        message: 'Неудача!',
        description: 'Данные не удалось получить! Попробуйте обновить страницу'
    },
    addSuccess: {
        type:'success',
        message: 'Успешно!',
        description: 'Данные успешно отправленно!'
    },
    editSuccess: {
        type:'success',
        message: 'Успешно!',
        description: 'Данные успешно измененны!'
    },
    deleteSuccess: {
        type:'success',
        message: 'Успешно',
        description: 'Данные успешно удаленны!'
    },
    addError: {
        type:'error',
        message: 'Неудача!',
        description: 'Данные неудалось добавить!'
    },
    editError: {
        type:'error',
        message: 'Неудача!',
        description: 'Данные неудалось изменить!'
    },
    deleteError: {
        type:'error',
        message: 'Неудача!',
        description: 'Данные неудалось удалить!'
    },
};

export const API: any = {
    auth: api.API_DOMAIN + 'auth',
    getFilters: api.API_DOMAIN + 'filter/list',
    addFilter: api.API_DOMAIN + 'filter/store',
    editFilter: api.API_DOMAIN + 'filter/update',
    deleteFilter: api.API_DOMAIN + 'filter/delete',

    getCategory: api.API_DOMAIN + 'category/list',
    getCategoryTree: api.API_DOMAIN + 'category/three',
    addCategory: api.API_DOMAIN + 'category/store',
    editCategory: api.API_DOMAIN + 'category/update',
    deleteCategory: api.API_DOMAIN + 'category/delete',
};
