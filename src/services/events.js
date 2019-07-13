import fetchApi from "../utils/fetch-api";
import apiRoutes from "../utils/routes";
import common from "./common";

const events = {
  async eventById(id, cb) {
    try {
      const eventRoute = apiRoutes.documentById(id);

      common.getRef().then(async data => {
        const response = await fetchApi.getData(eventRoute.path, {
          q: eventRoute.q,
          ref: data.refs[0].ref
        });
        const resData = await response.json();

        cb(response.ok, resData)
      })
    } catch (error) {
      console.log(`services.events.eventById.ERROR: ${error}`)
    }
  },
  async allEvents(cb) {
    try {
      const eventsRoute = apiRoutes.events();

      common.getRef().then(async data => {
        const response = await fetchApi.getData(eventsRoute.path, {
          q: eventsRoute.q,
          ref: data.refs[0].ref
        });
        const resData = await response.json();
    
        cb(response.ok, resData)
      })
    } catch (error) {
      console.log(`services.events.allEvents.ERROR: ${error}`)
    }
  }
}

export default events
