import axios from "axios";
import { DEVELOPMENT_ENDPOINT } from "../constants/endPoints.js";

function getDefaultUrl(env = "development") {
  switch (env.toLowerCase()) {
    case "development":
      return DEVELOPMENT_ENDPOINT;
    default:
      return DEVELOPMENT_ENDPOINT;
  }
}

axios.defaults.baseURL = getDefaultUrl(process.env.NODE_ENV);

axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    const errorObject = {
      code: error.response.status,
      ...error.response.data
    };
    // Do something with response error
    return Promise.reject(errorObject);
  }
);

export default function api({ url, method, data = null, params = {} }) {
  const requestConfig =
    data === null ? { url, method, params } : { url, method, data, params };
  console.log(`API Name : ${url} with data`);
  return new Promise((resolve, reject) => {
    axios
      .request(requestConfig)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}
