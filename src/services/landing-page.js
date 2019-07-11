import fetchApi from "../utils/fetch-api";
import apiRoutes from "../utils/routes";
import common from "./common";

const landingPage = {
  async get(cb) {
    try {
      const lpRoute = apiRoutes.landingPage();

      common.getRef().then(async data => {
        const response = await fetchApi.getData(lpRoute.path, {
          q: lpRoute.q,
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
      console.log(`services.landingPage.get.ERROR: ${error}`)
    }
  }
}

export default landingPage
