import {
  RECEIVE_PARTNERS,
} from './constants';

export function receivePartners (partners) {
  return {
    type: RECEIVE_PARTNERS,
    partners
  }
}
