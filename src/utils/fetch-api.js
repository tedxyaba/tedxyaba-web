import { TALKS_PER_PAGE } from "./configs";

let headers = new Headers();

headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');

const fetchApi = {
  getData(endpoint='', params = {}) {
    return fetch(buildUrl(endpoint, params), {
      mode: "cors",
      headers: headers
    })
  },
  postData(method, endpoint = '', payload={}, params = {}) {
    return fetch(buildUrl(endpoint, params), {
      method: method.toUpperCase(),
      mode: "cors",// no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: headers,
      body: JSON.stringify(payload)
    })
  },
};

const buildUrl = (endpoint, p = {}) => {
  const params = {filters: p};
  let query = '';

  if (Object.keys(params).length > 0) {
    for(let key in params) {
      if (params.hasOwnProperty(key)) {
        const value = JSON.stringify(params[key]);
        query += !query ? `?${key}=${value}` : `&${key}=${value}`;
      }
    }
  }

  return `${process.env.REACT_APP_API_BASE_URL}${endpoint}${query}`
};

export const fetchInitialData = () => {
  return Promise.all([
    fetchApi.getData('/events'),
    fetchApi.getData('/talks', {per_page: TALKS_PER_PAGE}),
    fetchApi.getData('/teams'),
    fetchApi.getData('/partners'),
  ])
  .then(([events, talks, teams, partners]) => {
    return {
      events,
      talks,
      teams,
      partners,
    }
  })
}

export default fetchApi;
