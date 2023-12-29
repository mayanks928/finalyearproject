import { useState } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login() {
  const [errors, setErrors] = useState({});
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const findFormErrors = () => {
    const { email, password } = loginFormData;
    const newErrors = {};

    if (!email || email === "") newErrors.email = "Cannot be blank!";

    if (!password || password === "") newErrors.password = "Cannot be blank!";
    return newErrors;
  };

  function handleInputChangeForLogin(event) {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });

    // eslint-disable-next-line no-extra-boolean-cast
    if (!!errors[name])
      setErrors({
        ...errors,
        [name]: null,
      });
  }

  function handleSubmitForLogin(event) {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      alert("No errors");
      console.log(loginFormData);
    }
  }
  return (
    <div className="loginCard">
      <div className="loginForm">
        <Form onSubmit={handleSubmitForLogin}>
          <Form.Group className="mb-4">
            <Form.Label>Email Id</Form.Label>
            <Form.Control
              type="email"
              onChange={handleInputChangeForLogin}
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
              onChange={handleInputChangeForLogin}
              name="password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit">Login</Button>
        </Form>
      </div>
      <div className="loginText enlarge-shrink-text">
        <p>Login to your existing account</p>
      </div>
    </div>
  );
}
