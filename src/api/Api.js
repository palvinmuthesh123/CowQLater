import axios from 'axios';
import {BaseURL} from '../constants/Constant';

export const postApiCall = async () => {
  await axios
    .post(BaseURL + apiPoint, {
      data,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};

export const getApiCall = async () => {
  await axios
    .get(BaseURL + apiPoint)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
};
