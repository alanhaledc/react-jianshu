import { fromJS } from 'immutable'
import * as types from './types'

const defaultState = fromJS({
  isLogin: false
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.CHANGE_LOGIN_STATUS:
      return state.set('isLogin', action.flag)
    default:
      return state
  }
}
