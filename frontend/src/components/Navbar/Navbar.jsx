import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/logo4.png";
import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const NavBar = ({ logout, isAuthenticated }) => {
  const [showBreak, setShowBreak] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowBreak(window.innerWidth < 450);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const AuthLinks = (
    <Fragment>
      <Nav.Link as={Link} to="/gallery">
        Gallery
      </Nav.Link>
      <Nav.Link onClick={logout} as={Link} to="/login">
        Logout
      </Nav.Link>
    </Fragment>
  );
  const GuestLinks = (
    <Fragment>
      <Nav.Link as={Link} to="/create-account">
        Create Account
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        Login
      </Nav.Link>
    </Fragment>
  );
  return (
    <>
      <Navbar className="myNavBar" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <div className="brand">
              <img className="logo" src={Logo} alt="Picture Perfect Logo" />
              <h1>Picture {showBreak && <br />}Perfect</h1>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle
            className="navToggleOnSmall"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navitems">
              <NavDropdown title="Tools" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/colorization">
                  Colorization
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/superresolution">
                  Super Resolution
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/inpainting">
                  Inpainting
                </NavDropdown.Item>
              </NavDropdown>
              {isAuthenticated ? AuthLinks : GuestLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(NavBar);
