import { fetchInitialData } from '../utils/fetch-api';
import { receiveEvents } from './events';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    const { events } = await fetchInitialData();
    const eventsData = await events.json();

    dispatch(hideLoading());
    dispatch(receiveEvents(eventsData))
  }
}
