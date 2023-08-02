import axios from 'axios';

class NetworkUtils {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  get(endpoint, params, formData) {
    return this.requestHttp('GET', this.baseUrl + endpoint, params);
  }

  post(endpoint, params, formData) {
    return this.requestHttp('POST', this.baseUrl + endpoint, params, formData);
  }

  put(endpoint, params, formData) {
    return this.requestHttp('PUT', this.baseUrl + endpoint, params);
  }

  delete(endpoint, params, formData) {
    return this.requestHttp('DELETE', this.baseUrl + endpoint, params);
  }

  requestHttp(method, url, params, form) {

    console.log("DJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ", form)
    return new Promise((resolve, reject) => {
      var formData = null; // FormData();

      if (form) {
        formData = form;
      } else if (params && params['type'] && !form) {
        formData = new FormData();
      } else {
        formData = new URLSearchParams()
      }
      let headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      };
      if (params) {
        for (var key in params) {
          if (key == 'Authorization') {
            headers[key] = params[key];
          } else {
            if (key == 'type') {
              headers['Content-Type'] = 'multipart/form-data';
            } else {
              formData.append(key, params[key]);
            }
          }
        }
      }

      let data = params && params['type'] ? formData : formData.toString()
      var options = {
        method,
        url,
        headers,
        data: data,
      };

      console.log(typeof data, 'NETWORK UTILITY     ', options, "DATA LLLLLLLLLLLLLL  ", data, data.toString());

      axios(options)
        .then(response => {
          resolve({ statusCode: response.status, body: response.data });
        })
        .catch(error => {
          if (error.response != undefined) {
            resolve({
              statusCode: error.response.status,
              body: error.response.data,
            });
          } else {
            if (error) {
              reject(error);
            } else reject('Can not connect to server!');

          }
        });
    });
  }
}
export default NetworkUtils;
