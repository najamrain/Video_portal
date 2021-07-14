import axios from "axios";
import { LOGIN_SUCCESS, LOGOUT } from "../types";
import {SIGNIN_API_URL } from '../../../contants';

export const signInAction = (username, password) => async dispatch => {

  try {
    const res = await axios.post(SIGNIN_API_URL, {username, password})
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { id: res.id, username: res.username }
    })
  }
  catch(error) {
    alert(error.response.request.responseText)
  }
};

export const signOutAction = () => async dispatch => {  
  dispatch({
    type: LOGOUT,
  })
};