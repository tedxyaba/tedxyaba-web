import {
  RECEIVE_TALKS,
} from './constants';

export function receiveTalks (talks) {
  return {
    type: RECEIVE_TALKS,
    talks
  }
}
