import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "./types";
import Cookies from "js-cookie";

export const register =
  (email, password, confirmPassword, firstName, lastName) =>
  async (dispatch) => {
    const csrfToken = Cookies.get("csrftoken");
    console.log("Signup-CSRF Token:", csrfToken);
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const body = JSON.stringify({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
    });
    // const apiUrl = `${process.env.VITE_APP_API_URL}/accounts/register`;
    const apiUrl = `${import.meta.env.VITE_APP_API_URL}/accounts/register`;
    console.log("Request URL:", apiUrl);
    try {
      const res = await axios.post(apiUrl, body, config);

      if (res.data.error) {
        console.error("Error:", res.data.error);
        dispatch({
          type: REGISTER_FAIL,
        });
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
        });
      }
    } catch (err) {
      console.error("Error2:", err);
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  const csrfToken = Cookies.get("csrftoken");
  console.log("Login-CSRF Token:", csrfToken);
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    email,
    password,
  });
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/accounts/login`;
  console.log("Request URL:", apiUrl);
  try {
    const res = await axios.post(apiUrl, body, config);

    if (res.data.error) {
      console.error("Error:", res.data.error);
      dispatch({
        type: LOGIN_FAIL,
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.email,
      });
    }
  } catch (err) {
    console.error("Error:", err);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  const csrfToken = Cookies.get("csrftoken");
  console.log("Logout-CSRF Token:", csrfToken);
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/accounts/logout`;
  console.log("Request URL:", apiUrl);
  try {
    const res = await axios.post(apiUrl,{}, config);

    if (res.data.error) {
      console.error("Error:", res.data.error);
      dispatch({
        type: LOGOUT_FAIL,
      });
    } else {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    }
  } catch (err) {
    console.error("Error:", err);
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};
