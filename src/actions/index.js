import { fetchInitialData } from '../utils/fetch-api';
import { receiveEvents } from './events';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const { events } = await fetchInitialData();
      const eventsData = await events.json();

      dispatch(hideLoading());
      dispatch(receiveEvents(eventsData))
    } catch (error) {
      dispatch(hideLoading());
      alert('Error Occurred!, An error occured while loading some resources. Kindly reload.')
    }
  }
}
