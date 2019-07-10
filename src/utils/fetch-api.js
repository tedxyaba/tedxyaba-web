const BASE_URL = "https://tedxyaba.cdn.prismic.io/api";
const accessToken = "MC5YU0pzSnhBQUFDSUE0RkxT.C--_ve-_ve-_vTjvv71x77-9I--_ve-_ve-_ve-_vT4Y77-977-9EO-_vWsgBxpdV--_ve-_ve-_vRQWOAQ";

let headers = new Headers();

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
  params.access_token = accessToken;

  let query = '';

  for(let key in params) {
    if (params.hasOwnProperty(key)) {
      query += !query ? `?${key}=${params[key]}` : `&${key}=${params[key]}`
    }
  }

  return `${base}${endpoint}${query}`
};

export default fetchApi
