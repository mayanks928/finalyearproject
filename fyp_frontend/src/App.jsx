import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar/Navbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Myimageslider from "./components/Myimageslider/Myimageslider";

function App() {

  return (
    <div>
      <NavBar />
      <Container lg>
        <Row>
          <Col md={12} lg={6} className="homeImage1" >
          <Myimageslider width={"500px"} height={"500px"}/>
          </Col>
          <Col md={12} lg={6} >
            <div className="content">
              <div className="textCard">
                <h2 className="display-1">AI Image Enhancement Tools</h2>
                <p>
                  Tired of blurry, low-resolution, or damaged images? Our
                  AI-powered image processing techniques can help you achieve
                  clear and high-quality images.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
