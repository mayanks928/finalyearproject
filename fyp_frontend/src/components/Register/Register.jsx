import React, { useState } from "react";

export default function Register() {
  const [signupFormData, setSignupFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleInputChangeForSignup(event) {
    const { name, value } = event.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  }

  function handleSubmitForSignup(event) {
    event.preventDefault();
    if (signupFormData.password !== signupFormData.confirmPassword) {
      alert("Passwords do not match");
    } else {
      console.log(signupFormData);
      // add your code to submit the form data to the server here
    }
  }
  return <div>Register</div>;
}
