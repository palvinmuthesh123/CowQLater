import Api from './Api';

export const GetPostResponse = (url, params, form) => {
  return new Promise((resolve, reject) => {
    Api.post(url, params, form)
      .then(response => {
        console.log(
          params,
          'GetPostResponse ' + url + '>>>>>>>>>>>>>>>>>>>>>',
          form,
          response,
        );
        if (response.statusCode == 200) {
          resolve(response.body);
        } else if (response.statusCode == 400) {
          resolve(response.body);
        } else if (response.statusCode == 201) {
          resolve(response.body);
        } else reject(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const GetResponse = (url, params) => {
  return new Promise((resolve, reject) => {
    Api.get(url, params)
      .then(response => {
        console.log('GetResponse ', url, params, response);
        if (response.statusCode == 200) {
          resolve(response.body);
        } else if (response.statusCode == 400) {
          resolve(response.body);
        } else if (response.statusCode == 201) {
          resolve(response.body);
        } else reject(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const DeleteResponse = (url, params) => {
  return new Promise((resolve, reject) => {
    Api.delete(url, params)
      .then(response => {
        console.log('GetPostResponse ', url, params, response);
        if (response.statusCode == 200) {
          resolve(response.body);
        } else if (response.statusCode == 400) {
          resolve(response.body);
        } else if (response.statusCode == 201) {
          resolve(response.body);
        } else reject(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const PutResponse = (url, params) => {
  return new Promise((resolve, reject) => {
    Api.put(url, params)
      .then(response => {
        console.log('GetPostResponse ', url, params, response);
        if (response.statusCode == 200) {
          resolve(response.body);
        } else if (response.statusCode == 400) {
          resolve(response.body);
        } else if (response.statusCode == 201) {
          resolve(response.body);
        } else reject(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};
