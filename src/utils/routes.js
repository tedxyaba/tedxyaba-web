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
  },
  aboutPage: () => {
    return {
      method :'GET',
      path: '/v2/documents/search',
      q: ApiHelpers.encode('type', 'about_page')
    }
  }
}

export default apiRoutes
