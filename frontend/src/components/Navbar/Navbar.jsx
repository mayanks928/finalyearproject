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
import { motion } from "framer-motion";

const container = {
  initial: {
    y: -100,
  },
  animate: {
    y: 0,
    transition: {
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};
const item = {
  initial: { rotate: -90, opacity: 0.1, scaleY: 0 },
  animate: {
    scaleY: 1,
    rotate: 0,
    opacity: 1,
  },
};
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
      <motion.div
      // initial={{ opacity: 0, y: -180 }}
      // animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
      // transition={{
      //   ease: [0.25, 0.1, 0.25, 1],
      //   duration: 0.5,
      // }}
      >
        <Navbar className="myNavBar" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              <div className="brand">
                <motion.img
                  animate={{ y: -10 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.4,
                    repeatDelay: 1.5,
                    type:"spring",
                  }}
                  className="logo"
                  src={Logo}
                  alt="Picture Perfect Logo"
                />
                <motion.h1
                  className="animatecontainer"
                  variants={container}
                  initial="initial"
                  animate="animate"
                >
                  {"Picture".split("").map((character, index) => {
                    return (
                      <motion.span
                        className="animateitem"
                        variants={item}
                        key={index}
                      >
                        {character}
                      </motion.span>
                    );
                  })}
                  {showBreak && <br />}{" "}
                  {"Perfect".split("").map((character, index) => {
                    return (
                      <motion.span
                        className="animateitem"
                        variants={item}
                        key={index}
                        style={{ display: "inline-block" }}
                      >
                        {character}
                      </motion.span>
                    );
                  })}
                </motion.h1>
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
      </motion.div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(NavBar);
