import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Myimageslider from "../Myimageslider/Myimageslider"
export default function Home() {
    return <Container lg>
      <Row className="py-4 justify-content-md-center">
        <Col md={12} lg={5} className="homeImage1">
          <Myimageslider width={"auto"} height={"450px"} />
        </Col>
        <Col
          md={12}
          lg={6}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="textTitleDiv">
            <h2>AI Image Enhancement Tools</h2>
            <p>
              Tired of blurry, low-resolution, or damaged images? Our
              AI-powered image processing techniques can help you achieve
              clear and high-quality images.
            </p>
          </div>
        </Col>
      </Row>
      <hr className="whiteHr" />
      <Row className="py-4">
        <Col md={12} lg={12}>
          <div className="textTitleDiv">
            <h2 className="textTitle">
              Automatically enhance your images for personal and business
              needs
            </h2>
          </div>
        </Col>
      </Row>
      <hr className="whiteHr" />
      <Row className="py-4">
        <Col
          md={12}
          lg={8}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="textTitleDiv2">
            <h3>Unblur image with advanced AI</h3>
            <p>
              Retouch and fix the blurry image using our advanced AI
              enhancement technology. Its time to unblur image for a clearer,
              crisper, and more precise result.
            </p>
          </div>
        </Col>
        <Col md={12} lg={4} className="homeImage1">
          <Myimageslider width={"500px"} height={"400px"} />
        </Col>
      </Row>
      <hr className="whiteHr" />
      <Row className="py-4">
        <Col md={12} lg={4} className="homeImage1">
          <Myimageslider width={"500px"} height={"400px"} />
        </Col>
        <Col
          md={12}
          lg={8}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="textTitleDiv2">
            <h3>Unblur image with advanced AI</h3>
            <p>
              Retouch and fix the blurry image using our advanced AI
              enhancement technology. Its time to unblur image for a clearer,
              crisper, and more precise result.
            </p>
          </div>
        </Col>
      </Row>
      <hr className="whiteHr" />
      <Row className="py-4">
        <Col
          md={12}
          lg={8}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="textTitleDiv2">
            <h3>Unblur image with advanced AI</h3>
            <p>
              Retouch and fix the blurry image using our advanced AI
              enhancement technology. Its time to unblur image for a clearer,
              crisper, and more precise result.
            </p>
          </div>
        </Col>
        <Col md={12} lg={4} className="homeImage1">
          <Myimageslider width={"500px"} height={"400px"} />
        </Col>
      </Row>
      <hr className="whiteHr" />
    </Container>;
  }