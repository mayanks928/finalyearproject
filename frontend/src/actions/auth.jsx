import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";
import Cookies from "js-cookie";

export const register =
  (email, password, confirmPassword, firstName, lastName) =>
  async (dispatch) => {
    const csrfToken = Cookies.get("csrftoken");
    console.log("CSRF Token:", csrfToken);
    const config = {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get('csrftoken'),
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
