export const CommonAction = (url, params, actions, Service) => {
  return dispatch => {
    dispatch({ type: actions.pending });
    Service(url, params)
      .then(res => {
        console.log("CommonAction >>>>> res  ", res)
        dispatch({
          type: actions.success,
          payload: res,
          message: res.message,
        });
      })
      .catch(e => {
        dispatch({
          type: actions.fail,
          message: e,
        });
      });
  };
};
export const CommonActionNoServiceCall = (params, actions) => {
  console.log('CommonActionNoServiceCall', params, actions)
  return dispatch => {
    dispatch({
      type: actions.success,
      payload: params,
    });
  };
};
export const ClearReducerAction = (params, actions) => {
  console.log('ClearReducerAction', params, actions);
  return dispatch => {
    dispatch({
      type: actions.success,
      payload: params,
    });
  };
};
