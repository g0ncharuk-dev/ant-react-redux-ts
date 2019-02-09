import { Reducer } from 'redux';
import { mainActionTypes } from '@app/constants';
import { IAction } from '@app/actions';

export interface IState {
    isAuthorized: any
}

const initialState: IState = {
    isAuthorized: localStorage.getItem('isAuth') || false
}


const reducer: Reducer<IState, IAction> = (state = initialState, action) => {
    switch (action.type) {
        case mainActionTypes.ISAUTHORIZED: {
            return { ...state, isAuthorized: action.payload }
        }
        default: {
            return state
        }
    }
}

export default reducer;