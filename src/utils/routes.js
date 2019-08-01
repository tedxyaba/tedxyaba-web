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
  documentByTag: (tag) => {
    return {
      method: 'GET',
      path: searchPath,
      q: ApiHelpers.encodeComponent('tags', tag)
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
  },
  aboutPage: () => {
    return {
      method :'GET',
      path: searchPath,
      q: ApiHelpers.encode('type', 'about_page')
    }
  }
}

export default apiRoutes
