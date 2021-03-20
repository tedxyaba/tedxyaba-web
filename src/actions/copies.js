import {
  RECEIVE_COPIES
} from './constants';

export function receiveDynamicCopies(copiesData) {
  return {
    type: RECEIVE_COPIES,
    copiesData
  }
}
