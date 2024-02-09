import axios from "axios";
import constants from "./Constants";
import { TokenService } from "./StorageServices";

const ApiService = {
  init(baseURL) {
    //axios.defaults.baseURL = `https://${process.env.REACT_APP_ACCOUNT_ID}.app.pctflex.com/server/api/v1/`;
    // axios.defaults.baseURL = `https://1002.app.pctflex.com/server/api/v1/`;
    axios.defaults.baseURL = `http://192.168.0.195:2025/server/api/v1/`;
  },

  setHeader(token) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${TokenService.getToken()} `;
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  get(resource) {
    return axios.get(resource);
  },

  blobGet(resource, data) {
    return axios.get(resource, data);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  patch(resource, data) {
    return axios.patch(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data);
  },
};

export default ApiService;
