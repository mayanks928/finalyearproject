import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
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
      });
      dispatch(checkAuthenticated());
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
    const res = await axios.post(apiUrl, {}, config);

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

export const checkAuthenticated = () => async (dispatch) => {
  const csrfToken = Cookies.get("csrftoken");
  console.log("checkAuthenticated-CSRF Token:", csrfToken);
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/accounts/authenticated`;
  console.log("Request URL:", apiUrl);
  try {
    const res = await axios.get(apiUrl, config);
    if (res.data.error || res.data.isAuthenticated === "error") {
      dispatch({
        type: AUTHENTICATED_FAIL,
        authentication_payload: false,
      });
    } else if (res.data.isAuthenticated === "success") {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        authentication_payload: true,
        userData_payload: res.data.user_data,
      });
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
        authentication_payload: false,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      authentication_payload: false,
    });
  }
};
