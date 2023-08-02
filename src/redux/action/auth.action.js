import * as ActionTypes from './action_type';
import { CommonActionNoServiceCall, CommonAction, ClearReducerAction } from './helper/CommonAction';
// import {Login} from '../service/auth.service';

export const login = (params) => {
  console.log('Get action', params);
  const actions = {
    pending: ActionTypes.LOGIN_PENDING,
    success: ActionTypes.LOGIN_SUCCESS,
    fail: ActionTypes.LOGIN_FAIL,
  };
  return CommonActionNoServiceCall(params, actions);
};

export const addFarm = (params) => {
  console.log('Get action', params);
  const actions = {
    pending: ActionTypes.ADD_FARM_PENDING,
    success: ActionTypes.ADD_FARM_SUCCESS,
    fail: ActionTypes.ADD_FARM_FAIL,
  };
  return CommonActionNoServiceCall(params, actions);
};

export const addPaddock = (params) => {
  console.log('Get action', params);
  const actions = {
    pending: ActionTypes.ADD_PADDOCK_PENDING,
    success: ActionTypes.ADD_PADDOCK_SUCCESS,
    fail: ActionTypes.ADD_PADDOCK_FAIL,
  };
  return CommonActionNoServiceCall(params, actions);
};

export const addRainfall = (params) => {
  console.log('Get action', params);
  const actions = {
    pending: ActionTypes.ADD_RAINFALL_PENDING,
    success: ActionTypes.ADD_RAINFALL_SUCCESS,
    fail: ActionTypes.ADD_RAINFALL_FAIL,
  };
  return CommonActionNoServiceCall(params, actions);
};

export const addTally = (params) => {
  console.log('Get action', params);
  const actions = {
    pending: ActionTypes.ADD_TALLY_PENDING,
    success: ActionTypes.ADD_TALLY_SUCCESS,
    fail: ActionTypes.ADD_TALLY_FAIL,
  };
  return CommonActionNoServiceCall(params, actions);
};

export const addAnimal = (params) => {
  console.log('Get action', params);
  const actions = {
    pending: ActionTypes.ADD_ANIMAL_PENDING,
    success: ActionTypes.ADD_ANIMAL_SUCCESS,
    fail: ActionTypes.ADD_ANIMAL_FAIL,
  };
  return CommonActionNoServiceCall(params, actions);
};

// export const login = (url, params) => {
//   console.log('Get action', url, params);
//   const actions = {
//     pending: ActionTypes.LOGIN_PENDING,
//     success: ActionTypes.LOGIN_SUCCESS,
//     fail: ActionTypes.LOGIN_FAIL,
//   };
//   return CommonAction(url, params, actions, Login);
// };



export const clearAuthReducer = params => {
  console.log('clearAuthReducer', params);
  const actions = {
    success: params.action,
  };
  delete params['action'];
  return ClearReducerAction(params, actions);
};