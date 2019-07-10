const apiRoutes = {
  landingPage: () => {
    return {
      method: 'GET',
      path: '/v2/documents/search',
      q: '%5B%5Bat%28document.type%2C+%22landing_page%22%29+%5D%5D' // consider encoding with encodeURI() here instead
    }
  },
  events: () => {
    return {
      method: 'GET',
      path: '/v2/documents/search',
      q: '%5B%5Bat%28document.type%2C+%22events%22%29+%5D%5D' // consider encoding with encodeURI() here instead
    }
  }
}

export default apiRoutes
