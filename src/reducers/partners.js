import { RECEIVE_PARTNERS } from "../actions/constants";

export default function partners (state = [], action) {
  switch (action.type) {
    case RECEIVE_PARTNERS:
      return state.concat(action.partners)
    default:
      return state
  }
}
