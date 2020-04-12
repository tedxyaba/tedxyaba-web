import { RECEIVE_EVENTS } from "../actions/constants";

export default function events (state = [], action) {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return state.concat(action.events)
    default:
      return state
  }
}
