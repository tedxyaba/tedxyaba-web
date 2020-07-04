import {
  RECEIVE_TALKS,
  RECEIVE_MORE_TALKS,
  SET_CURRENT_TALKS_PAGE,
} from './constants';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
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

export const handleMoreTalks = (page) => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const talks = await fetchApi.getData('/talks', {filters: {per_page: TALKS_PER_PAGE, page_count: page}})
      const talksData = await talks.json();

      dispatch(receiveMoreTalks(talksData));
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(`Error fetching next page!, ${error}`)
    }
  }
}
