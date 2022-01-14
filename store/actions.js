export const SET_USER_UID  = "SET_USER_UID"
export const SET_IS_LOADING = "SET_IS_LOADING"

export const setUserUid = userUid => dispatch =>{
  dispatch({
      type: SET_USER_UID,
      payload:userUid

  });
};

export const setIsLoading = isLoading => dispatch => {
    dispatch({
        type: SET_IS_LOADING,
        payload:isLoading
    });
};