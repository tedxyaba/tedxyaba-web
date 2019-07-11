import ApiHelpers from "../helpers/api-helpers";

const apiRoutes = {
  landingPage: () => {
    return {
      method: 'GET',
      path: '/v2/documents/search',
      q: ApiHelpers.encode('type', 'landing_page')
    }
  },
  events: () => {
    return {
      method: 'GET',
      path: '/v2/documents/search',
      q: ApiHelpers.encode('type', 'events')
    }
  }
}

export default apiRoutes
