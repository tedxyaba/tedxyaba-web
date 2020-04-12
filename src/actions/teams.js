import {
  RECEIVE_TEAMS,
} from './constants';

export function receiveTeams (teams) {
  return {
    type: RECEIVE_TEAMS,
    teams
  }
}
