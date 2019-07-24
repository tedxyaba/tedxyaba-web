import fetchApi from "../utils/fetch-api";
import common from "./common";

const apiClient = {
  async get(route, cb) {
    try {
      common.getRef().then(async data => {
        const response = await fetchApi.getData(route.path, {
          q: route.q,
          ref: data && data.refs[0].ref
        });
        const resData = await response.json();
    
        cb(response.ok, resData)
      })
    } catch (error) {
      console.log(`services.get.ERROR: ${error}, q: ${route.q}`)
    }
  }
}

export default apiClient
