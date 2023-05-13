import "./App.css";
import { ReactCompareSliderImage } from "react-compare-slider";
import { ReactCompareSlider } from "react-compare-slider";
import { ReactCompareSliderHandle } from "react-compare-slider";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <NavBar />
      <div className="homeCard">
        <div className="homeImageSlider">
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
              height: "100%",
              width: "100%",
            }}
          />
        </div>
        <div className="homeStart">
          <div className="nav">
            <p>Tools</p>
            <p>Create Account</p>
            <p>Login</p>
            <p>About Us</p>
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default App;
