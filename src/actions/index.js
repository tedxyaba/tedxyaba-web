import { fetchInitialData } from '../utils/fetch-api';
import { receiveEvents } from './events';
import { receiveTeams } from './teams';
import { receivePartners } from './partners';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const { events, teams, partners } = await fetchInitialData();
      const eventsData = await events.json();
      const teamsData = await teams.json();
      const partnersData = await partners.json();

      dispatch(hideLoading());
      dispatch(receiveEvents(eventsData));
      dispatch(receiveTeams(teamsData));
      dispatch(receivePartners(partnersData));
    } catch (error) {
      dispatch(hideLoading());
      alert(`Error Occurred!, ${error}`)
    }
  }
}
