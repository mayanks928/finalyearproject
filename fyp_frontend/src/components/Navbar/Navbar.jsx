import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/logo4.png";
import "./Navbar.css";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
  const [showBreak, setShowBreak] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowBreak(window.innerWidth < 450);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <Navbar className="myNavBar" variant="dark"  expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <div className="brand">
              <img className="logo" src={Logo} alt="Picture Perfect Logo" />
              <h1>Picture {showBreak && <br />}Perfect</h1>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle className="navToggleOnSmall" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navitems">
              <NavDropdown  title="Tools" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Image Deblur
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Super Resolution
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Inpainting
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/register">Create Account</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
