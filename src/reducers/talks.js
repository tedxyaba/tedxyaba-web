import {
  RECEIVE_TALKS,
  RECEIVE_MORE_TALKS,
  SET_CURRENT_TALKS_PAGE,
  LOADING_TALKS,
  RECEIVE_FILTERED_TALKS,
} from "../actions/constants"

export default function talks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_TALKS:
      return {
        ...action.talks,
        recent_talks: action.talks.talks,
        current_page: action.talks.page_count,
        [action.talks.page_count]: action.talks.talks
      }
    case RECEIVE_FILTERED_TALKS:
      return {
        ...action.talks,
        recent_talks: state.recent_talks,
        current_page: action.talks.page_count,
        [action.talks.page_count]: action.talks.talks
      }
    case RECEIVE_MORE_TALKS:
      return {
        ...state,
        ...action.next,
        current_page: action.next.page_count,
        [action.next.page_count]: action.next.talks,
        talks: state.talks.concat(action.next.talks)
      }
    case SET_CURRENT_TALKS_PAGE:
      return {
        ...state,
        current_page: action.page
      }
    case LOADING_TALKS:
      return {
        ...state,
        loading: action.state
      }
    default:
      return state
  }
}
