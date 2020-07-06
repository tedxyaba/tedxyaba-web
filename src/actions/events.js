import {
  RECEIVE_EVENTS,
  RECEIVE_MORE_EVENTS,
  LOADING_EVENTS,
  SET_CURRENT_EVENTS_PAGE,
  RECEIVE_FILTERED_EVENTS,
} from './constants';
import fetchApi from '../utils/fetch-api';
import { EVENTS_PER_PAGE } from '../utils/configs';

export function setCurrentPage (page) {
  return {
    type: SET_CURRENT_EVENTS_PAGE,
    page
  }
}

export function receiveEvents (events) {
  return {
    type: RECEIVE_EVENTS,
    events
  }
}

function receiveFilteredEvents (events) {
  return {
    type: RECEIVE_FILTERED_EVENTS,
    events
  }
}

function receiveMoreEvents (next) {
  return {
    type: RECEIVE_MORE_EVENTS,
    next
  }
}

function loadingEvents (state) {
  return {
    type: LOADING_EVENTS,
    state
  }
}

export const handleMoreEvents = (page, params) => {
  return async (dispatch) => {
    dispatch(loadingEvents(true));

    try {
      const events = await fetchApi.getData('/events', {per_page: EVENTS_PER_PAGE, page_count: page, ...params});
      const eventsData = await events.json();

      dispatch(receiveMoreEvents(eventsData));
      dispatch(loadingEvents(false));
    } catch (error) {
      dispatch(loadingEvents(false));
      console.log(`Error fetching events next page!, ${error}`)
    }
  }
}

export const handleSearchAndFilterEvents = (params) => {
  return async (dispatch) => {
    dispatch(loadingEvents(true));

    try {
      const events = await fetchApi.getData('/events', {per_page: EVENTS_PER_PAGE, ...params})
      const eventsData = await events.json();

      dispatch(receiveFilteredEvents(eventsData));
      dispatch(loadingEvents(false));
    } catch (error) {
      dispatch(loadingEvents(false));
      console.log(`Error filtering events!, ${error}`)
    }
  }
}
