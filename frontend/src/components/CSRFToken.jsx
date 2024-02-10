import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CSRFToken = () => {
  const [csrftoken, setcsrftoken] = useState("");
  // const getCookie = (name) => {
  //   let cookieValue = null;
  //   if (document.cookie && document.cookie !== "") {
  //     let cookies = document.cookie.split(";");
  //     console.log(cookies);
  //     for (let i = 0; i < cookies.length; i++) {
  //       let cookie = cookies[i].trim();
  //       // Does this cookie string begin with the name we want?
  //       if (cookie.substring(0, name.length + 1) === name + "=") {
  //         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
  //         break;
  //       }
  //     }
  //   }
  //   return cookieValue;
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/accounts/csrf_cookie`
        );
        // setcsrftoken(getCookie("csrftoken"));
        setcsrftoken(Cookies.get('csrftoken'))
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchData();
    // console.log("set csrf token");
  }, []);
  useEffect(() => {
    // console.log("inside this:")
    // console.log(csrftoken);
  }, [csrftoken]);
  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};

export default CSRFToken;
