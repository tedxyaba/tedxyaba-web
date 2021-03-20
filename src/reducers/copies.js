import {
  RECEIVE_COPIES
} from "../actions/constants";

export default function copies (state = {}, action) {
  switch (action.type) {
    case RECEIVE_COPIES:
      // get new copy data from action
      action.copiesData.copies.map(nc => (state.find(ec => ec.key === nc.key ) || {}).copy = nc.copy )
      return state
    default:
      return state
  }
}
