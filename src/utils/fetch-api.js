const BASE_URL = 'https://tedxyaba.herokuapp.com';

let headers = new Headers();

headers.append('Accept', 'application/json');

const fetchApi = {
  getData(endpoint='', params = {}) {
    return fetch(buildUrl(BASE_URL, endpoint, params), {
      mode: "cors",
      headers: headers
    })
  },
  sendData(method, endpoint = '', params = {}, payload={}) {
    return fetch(buildUrl(BASE_URL, endpoint, params), {
      method: method,
      mode: "cors",// no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "include", // include, same-origin, *omit
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
        query += !query ? `?${key}=${params[key]}` : `&${key}=${params[key]}`
      }
    }
  }

  return `${base}${endpoint}.json${query}`
};

export const fetchInitialData = () => {
  return Promise.all([
    fetchApi.getData('/events'),
    fetchApi.getData('/teams'),
  ])
  .then(([events, teams]) => {
    return {
      events,
      teams,
    }
  })
}

export default fetchApi;
