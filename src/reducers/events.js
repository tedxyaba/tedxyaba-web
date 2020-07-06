import {
  RECEIVE_EVENTS,
  RECEIVE_MORE_EVENTS,
  SET_CURRENT_EVENTS_PAGE,
  LOADING_EVENTS,
  RECEIVE_FILTERED_EVENTS,
} from "../actions/constants";

export default function events (state = {}, action) {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return {
        ...action.events,
        recent_events: action.events.events,
        current_page: action.events.page_count,
        [action.events.page_count]: action.events.events
      }
    case RECEIVE_FILTERED_EVENTS:
      return {
        ...action.events,
        recent_events: state.recent_events,
        current_page: action.events.page_count,
        [action.events.page_count]: action.events.events
      }
    case RECEIVE_MORE_EVENTS:
      return {
        ...state,
        ...action.next,
        current_page: action.next.page_count,
        [action.next.page_count]: action.next.events,
        talks: state.events.concat(action.next.events)
      }
    case SET_CURRENT_EVENTS_PAGE:
      return {
        ...state,
        current_page: action.page
      }
    case LOADING_EVENTS:
      return {
        ...state,
        loading: action.state
      }
    default:
      return state
  }
}
