
import * as constants from '@app/constants';

export interface IAction {
    type: constants.mainActionTypes.TEST
}

export function test(): IAction {
    return {
        type: constants.mainActionTypes.TEST
    };
}
