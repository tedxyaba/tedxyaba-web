import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import about from './about';
import events from './events';
import talks from './talks';
import blog from './blog';
import partners from './partners';
import team from './team';
import socials from './socials';

export default combineReducers({
  loadingBar: loadingBarReducer,
  about,
  events,
  talks,
  blog,
  partners,
  team,
  socials,
})
