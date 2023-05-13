import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/logo2.png";
import "./Navbar.css";
export default function NavBar() {
  return (
    <>
      <Navbar className="myNavBar" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <div className="brand">
              <img className="logo" src={Logo} alt="AB" />
              <h1>Picture Perfect</h1>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto navitems">
              <Nav.Link  href="#home">Create Account</Nav.Link>
              <Nav.Link href="#link">Login</Nav.Link>
              <NavDropdown title="Tools" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Image Deblur</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                Super Resolution
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Inpainting
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
