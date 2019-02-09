
export const enum mainActionTypes {
    FETCH_AUTH = '@api/auth',
    ISAUTHORIZED = '@app/isAuthorized',
}

export interface IsAuthorized {
    type: mainActionTypes.ISAUTHORIZED;
}

export type IAction = IsAuthorized;