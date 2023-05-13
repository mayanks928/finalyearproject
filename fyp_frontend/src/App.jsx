import "./App.css";
import { ReactCompareSliderImage } from "react-compare-slider";
import { ReactCompareSlider } from "react-compare-slider";
import { ReactCompareSliderHandle } from "react-compare-slider";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar/Navbar";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function App() {
  return (
    <div>
      <NavBar />
      <Container>
        <Row>
          <Col md={12} lg={6} >
            <ReactCompareSlider
              handle={
                <ReactCompareSliderHandle
                  buttonStyle={{ display: "none" }}
                  linesStyle={{ width: 0 }}
                />
              }
              changePositionOnHover={true}
              boundsPadding={0}
              itemOne={
                <ReactCompareSliderImage
                  alt="Image one"
                  src="https://images.unsplash.com/photo-1438401171849-74ac270044ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1784&q=70"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  alt="Image two"
                  src="https://images.unsplash.com/photo-1437809781432-a957377661ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1784&q=70"
                  style={{ transform: "scale(1.125)" }}
                />
              }
              position={50}
              style={{
                height: "80vh",
                width: "auto",
              }}
            />
          </Col>
          <Col md={12} lg={6} >
            <div className="content">
              <div className="textCard">
                <h2>AI Image Enhancement Tools</h2>
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
