import { Reducer } from 'redux'
import { mainActionTypes } from '@app/constants'
import { IAction } from '@app/actions'

interface IState {
  testVal: boolean
}

const initialState: IState = {
  testVal: false
}


export const reducer: Reducer<IState, IAction> = (state = initialState, action) => {
  switch (action.type) {
    case mainActionTypes.TEST: {
      return { ...state, testVal: !state.testVal }
    }
    default: {
      return state
    }
  }
}
 
