import {
  RECEIVE_COPIES
} from "../actions/constants";

export default function copies (state = {}, action) {
  switch (action.type) {
    case RECEIVE_COPIES:
      return action.copiesData.copies
    default:
      return state
  }
}
