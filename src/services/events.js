import fetchApi from "../utils/fetch-api";
import apiRoutes from "../utils/routes";
import common from "./common";

const events = {
  async allEvents(cb) {
    try {
      const eventsRoute = apiRoutes.events();

      common.getRef().then(async data => {
        const response = await fetchApi.getData(eventsRoute.path, {
          q: eventsRoute.q,
          ref: data.refs[0].ref
        });
        const resData = await response.json();
    
        if (response.ok) {
          cb(response.ok, resData)
        } else {
          cb(response.ok, resData)
        }
      })
    } catch (error) {
      console.log(`services.events.allEvents.ERROR: ${error}`)
    }
  }
}

export default events
