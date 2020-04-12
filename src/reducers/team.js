import { RECEIVE_TEAMS } from "../actions/constants";

export default function team (state = [], action) {
  switch (action.type) {
    case RECEIVE_TEAMS:
      return state.concat(action.teams)
    default:
      return state
  }
}
