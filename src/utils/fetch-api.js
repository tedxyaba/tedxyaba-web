const BASE_URL = 'https://tedxyaba.herokuapp.com';

let headers = new Headers();

headers.append('Accept', 'application/json');
headers.append('Content-Type', 'application/json');

const fetchApi = {
  getData(endpoint='', params = {}) {
    return fetch(buildUrl(BASE_URL, endpoint, params), {
      mode: "cors",
      headers: headers
    })
  },
  postData(method, endpoint = '', payload={}, params = {}) {
    return fetch(buildUrl(BASE_URL, endpoint, params), {
      method: method.toUpperCase(),
      mode: "cors",// no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: headers,
      body: JSON.stringify(payload)
    })
  },
};

const buildUrl = (base, endpoint, params = {}) => {
  let query = '';

  if (Object.keys(params).length > 0) {
    for(let key in params) {
      if (params.hasOwnProperty(key)) {
        const value = JSON.stringify(params[key]);
        query += !query ? `?${key}=${value}` : `&${key}=${value}`;
      }
    }
  }

  return `${base}${endpoint}${query}`
};

export const fetchInitialData = () => {
  return Promise.all([
    fetchApi.getData('/events'),
    fetchApi.getData('/talks'),
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
