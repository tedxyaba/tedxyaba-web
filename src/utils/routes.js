import ApiHelpers from "../helpers/api-helpers";

const searchPath = '/v2/documents/search';

const apiRoutes = {
  documentById: (id) => {
    return {
      method: 'GET',
      path: searchPath,
      q: ApiHelpers.encode('id', id)
    }
  },
  landingPage: () => {
    return {
      method: 'GET',
      path: searchPath,
      q: ApiHelpers.encode('type', 'landing_page')
    }
  },
  events: () => {
    return {
      method: 'GET',
      path: searchPath,
      q: ApiHelpers.encode('type', 'events')
    }
  }
}

export default apiRoutes
