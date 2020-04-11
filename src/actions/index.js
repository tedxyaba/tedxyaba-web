import { fetchInitialData } from "../utils/fetch-api"
import { receiveEvents } from "./events"

export const handleInitialData = () => {
  return async (dispatch) => {
    const { events } = await fetchInitialData();
    const eventsData = await events.json();

    console.log('la-data: ', eventsData)

    dispatch(receiveEvents(eventsData))
  }
}
