import {
  RECEIVE_EVENTS
} from './constants';

export function receiveEvents (events) {
  return {
    type: RECEIVE_EVENTS,
    events
  }
}
