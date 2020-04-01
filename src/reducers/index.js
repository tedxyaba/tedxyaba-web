import { combineReducers } from 'redux';
import about from './about';
import events from './events';
import talks from './talks';
import blog from './blog';
import partners from './partners';
import team from './team';
import socials from './socials';

export default combineReducers({
  about,
  events,
  talks,
  blog,
  partners,
  team,
  socials,
})
