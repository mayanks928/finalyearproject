import { useState } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import CSRFToken from "../CSRFToken";
import { Navigate } from "react-router-dom";
import PageTransition from "../../PageTransition";

const Login = ({ login, isAuthenticated }) => {
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
  const { email, password } = loginFormData;
  function handleSubmitForLogin(event) {
    event.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      // alert("No errors");
      login(email, password);
    }
  }
  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <PageTransition>
      <div className="loginCard">
        <div className="loginForm">
          <Form onSubmit={handleSubmitForLogin}>
            <CSRFToken />
            <Form.Group className="mb-4">
              <Form.Control
                type="email"
                onChange={handleInputChangeForLogin}
                name="email"
                placeholder="Email Id"
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                onChange={handleInputChangeForLogin}
                name="password"
                placeholder="Password"
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
    </PageTransition>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
