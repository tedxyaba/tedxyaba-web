import { fetchInitialData } from '../utils/fetch-api';
import { receiveDynamicCopies } from './copies';
import { receiveEvents } from './events';
import { receiveTeams } from './teams';
import { receivePartners } from './partners';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { receiveTalks } from './talks';

export const handleInitialData = () => {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const { dynamicCopies, events, talks, teams, partners } = await fetchInitialData();
      const dynamicCopiesData = await dynamicCopies.json();
      const eventsData = await events.json();
      const talksData = await talks.json();
      const teamsData = await teams.json();
      const partnersData = await partners.json();

      dispatch(receiveDynamicCopies(dynamicCopiesData));
      dispatch(receiveEvents(eventsData));
      dispatch(receiveTalks(talksData));
      dispatch(receiveTeams(teamsData));
      dispatch(receivePartners(partnersData));
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.log(`Error Occurred!, ${error}`)
    }
  }
}
