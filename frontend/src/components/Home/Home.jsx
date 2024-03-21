import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Myimageslider from "../Myimageslider/Myimageslider";
import DenoisedImg from "../../assets/home_restored.png";
import restoredBefore from "../../assets/rr_before.png";
import restoredAfter from "../../assets/rr_after.png";
import inpaintingGif from "../../assets/inpainting_gif.gif";
import "./Home.css";
import PageTransition from "../../PageTransition";

const Home = () => {
  return (
    <PageTransition>
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
                require a higher resolution, let our models transform your
                visuals to meet your exact specifications. Elevate the quality
                of your images with our cutting-edge technology.
              </p>
            </div>
          </Col>
          <Col sm={6} lg={5} className="homeImage1 mx-auto">
            <div className="imagesBefAndAft">
              <img src={DenoisedImg} alt="" />
            </div>
          </Col>
        </Row>
        <hr className="whiteHr" />
        <Row className="py-4 alternateHomeCard">
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
        {/* <Row className="py-4">
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
      </Row> */}
        <Row className="py-4">
          <Col
            md={12}
            lg={8}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="textTitleDiv2">
              <h3>Restore Images with Advanced AI</h3>
              <p>
                Effortlessly eliminate imperfections and enhance the overall
                quality of your images using our state-of-the-art AI image
                restoration technology. Transform your visuals into pristine,
                high-quality masterpieces with our innovative solution for a
                clearer, more captivating, and faithfully restored result.
              </p>
            </div>
          </Col>
          <Col md={12} lg={4} className="homeImage1">
            <Myimageslider
              width={"100%"}
              height={"auto"}
              objectFit={"contain"}
              img1={restoredBefore}
              img2={restoredAfter}
            />
          </Col>
        </Row>
        <hr className="whiteHr" />
        {/* <Row className="py-4 alternateHomeCard">
          <Col xs={6} lg={3} className="homeImage1 mx-auto">
            <Myimageslider
              img1={homeGray}
              img2={homeColor}
              width={"100%"}
              height={"auto"}
              objectFit={"contain"}
            />
          </Col>
          <Col
            md={12}
            lg={7}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="textTitleDiv2">
              <h3>Vivid Colorization Enhancement</h3>
              <p>
                Add a splash of color to your monochrome memories using our
                AI-driven colorization technology.
              </p>
            </div>
          </Col>
        </Row> */}
        <hr className="whiteHr" />
        <Row className="py-4 alternateHomeCard">
          <Col
            md={12}
            lg={8}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="textTitleDiv2">
              <h3>Inpainting with AI Magic</h3>
              <p>
                Say goodbye to imperfections in your images as our advanced AI
                inpainting effortlessly restores and enhances, leaving you with
                flawless and captivating visuals.
              </p>
            </div>
          </Col>
          <Col md={12} lg={4} className="homeImage1">
            <div className="inpaintingEgDiv">
            <img src={inpaintingGif} alt="Inpainting Example GIF"/>
            </div>
          </Col>
        </Row>
        <hr className="whiteHr" />
      </Container>
    </PageTransition>
  );
};

export default Home;
