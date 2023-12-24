import React, { useState } from "react";
import "./Register.css";
import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
export default function Register() {
  const [errors, setErrors] = useState({});
  const [signupFormData, setSignupFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const findFormErrors = () => {
    const { firstName, lastName, email, password, confirmPassword } =
      signupFormData;
    const newErrors = {};

    if (!firstName || firstName === "")
      newErrors.firstName = "Cannot be blank!";
    else if (firstName.length > 30) newErrors.firstName = "Is too long!";

    if (!lastName || lastName === "") newErrors.lastName = "Cannot be blank!";
    else if (lastName.length > 30) newErrors.lastName = "Is too long!";

    if (!email || email === "") newErrors.email = "Cannot be blank!";

    if (!password || password === "") newErrors.password = "Cannot be blank!";

    if (!confirmPassword || confirmPassword === "")
      newErrors.confirmPassword = "Cannot be blank!";
    else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords must match";
      newErrors.password = "Passwords must match";
    }
    return newErrors;
  };
  function handleInputChangeForSignup(event) {
    const { name, value } = event.target;
    setSignupFormData({ ...signupFormData, [name]: value });

    // eslint-disable-next-line no-extra-boolean-cast
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  }

  function handleSubmitForSignup(event) {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      alert("No errors");
      console.log(signupFormData);
    }
  }
  return (
    <div className="registrationCard">
      <div className="registrationForm">
        <Form onSubmit={handleSubmitForSignup}>
          <Form.Group className="mb-4">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleInputChangeForSignup}
              name="firstName"
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              onChange={handleInputChangeForSignup}
              name="lastName"
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Email Id</Form.Label>
            <Form.Control
              type="email"
              onChange={handleInputChangeForSignup}
              name="email"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleInputChangeForSignup}
              name="password"
              minLength={8}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleInputChangeForSignup}
              name="confirmPassword"
              minLength={8}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Create Account</Button>
        </Form>
      </div>
      <div className="registrationText enlarge-shrink-text">
        <p>Create an account to get started</p>
      </div>
    </div>
  );
}
