import {
  RECEIVE_TALKS,
  RECEIVE_MORE_TALKS,
  LOADING_MORE_TALKS,
  SET_CURRENT_TALKS_PAGE,
} from './constants';
import fetchApi from '../utils/fetch-api';
import { TALKS_PER_PAGE } from '../utils/configs';

export function setCurrentPage (page) {
  return {
    type: SET_CURRENT_TALKS_PAGE,
    page
  }
}

export function receiveTalks (talks) {
  return {
    type: RECEIVE_TALKS,
    talks
  }
}

function receiveMoreTalks (next) {
  return {
    type: RECEIVE_MORE_TALKS,
    next
  }
}

function loadingTalks (state) {
  return {
    type: LOADING_MORE_TALKS,
    state
  }
}

export const handleSearchAndFilterTalks = (params) => {
  return async (dispatch) => {
    dispatch(loadingTalks(true));

    try {
      const talks = await fetchApi.getData('/talks', {per_page: TALKS_PER_PAGE, ...params})
      const talksData = await talks.json();

      dispatch(receiveTalks(talksData));
      dispatch(loadingTalks(false));
    } catch (error) {
      dispatch(loadingTalks(false));
      console.log(`Error filtering talks!, ${error}`)
    }
  }
}

export const handleMoreTalks = (page, params) => {
  return async (dispatch) => {
    dispatch(loadingTalks(true));

    try {
      const talks = await fetchApi.getData('/talks', {per_page: TALKS_PER_PAGE, page_count: page, ...params});
      const talksData = await talks.json();

      dispatch(receiveMoreTalks(talksData));
      dispatch(loadingTalks(false));
    } catch (error) {
      dispatch(loadingTalks(false));
      console.log(`Error fetching next page!, ${error}`)
    }
  }
}
