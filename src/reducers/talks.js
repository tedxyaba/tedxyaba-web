import { RECEIVE_TALKS } from "../actions/constants"

export default function talks (state = [], action) {
  switch (action.type) {
    case RECEIVE_TALKS:
      return state.concat(action.talks)
    default:
      return state
  }
}
