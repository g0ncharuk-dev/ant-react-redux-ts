
import * as constants from '@app/constants';

export interface IAction {
    type: string;
    payload: any;
}

export function isAuth(data: boolean): IAction {
    return {
        type: constants.mainActionTypes.ISAUTHORIZED, 
        payload: data
    };
}
