import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Myimageslider from "../Myimageslider/Myimageslider";
import "./Home.css";
export default function Home() {
  return (
    <Container fluid>    
      <Row className="homeCardParent py-4 justify-content-md-center">
        <Col
          md={12}
          lg={6}
          className="homeCard d-flex flex-column justify-content-center align-items-center"
        >
          <div className="textTitleDiv">
            <h2>AI Image Enhancement Tools</h2>
            <p>
              Enhance the clarity of your images with our AI-driven image
              processing techniques. Whether your image is too noisy or you
              require a higher resolution, let our models transform your visuals
              to meet your exact specifications. Elevate the quality of your
              images with our cutting-edge technology.
            </p>
          </div>
        </Col>
        <Col md={12} lg={5} className="homeImage1">
          <Myimageslider
            width={"auto"}
            height={"600px"}
            objectFit={"contain"}
          />
        </Col>
      </Row>
      <hr className="whiteHr" />
      <Row className="py-4">
        <Col md={12} lg={12}>
          <div className="textTitleDiv">
            <h2 className="textTitle">
              Automatically enhance your images for personal and business needs
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
            <h3>Denoise Images with Advanced AI</h3>
            <p>
              Effortlessly eliminate unwanted noise and enhance the clarity of
              your images using our state-of-the-art AI denoising technology.
              Transform your visuals into pristine, high-quality masterpieces
              with our innovative solution for a clearer and more captivating
              result.
            </p>
          </div>
        </Col>
        <Col md={12} lg={4} className="homeImage1">
          <Myimageslider width={"100%"} height={"auto"} objectFit={"contain"} />
        </Col>
      </Row>
      <hr className="whiteHr" />
      <Row className="py-4">
        <Col md={12} lg={4} className="homeImage1">
          <Myimageslider width={"100%"} height={"auto"} objectFit={"contain"} />
        </Col>
        <Col
          md={12}
          lg={8}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <div className="textTitleDiv2">
            <h3>Unblur image with advanced AI</h3>
            <p>
              Retouch and fix the blurry image using our advanced AI enhancement
              technology. Its time to unblur image for a clearer, crisper, and
              more precise result.
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
              Retouch and fix the blurry image using our advanced AI enhancement
              technology. Its time to unblur image for a clearer, crisper, and
              more precise result.
            </p>
          </div>
        </Col>
        <Col md={12} lg={4} className="homeImage1">
          <Myimageslider width={"100%"} height={"auto"} objectFit={"contain"} />
        </Col>
      </Row>
      <hr className="whiteHr" />
    </Container>
  );
}
