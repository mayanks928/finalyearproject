import { ReactCompareSliderImage } from "react-compare-slider";
import { ReactCompareSlider } from "react-compare-slider";
import { ReactCompareSliderHandle } from "react-compare-slider";
// import SampleImage from "../../assets/mountain.jpg";
// import SampleImageNoised from "../../assets/mountainnoised.jpg";
import "./Myimageslider.css";
import PropTypes from "prop-types";
export default function Myimageslider(props) {
  return (
    <ReactCompareSlider
      handle={
        <ReactCompareSliderHandle
          // buttonStyle={{ display: "none" }}
          style={{ color: "yellow" }}
          linesStyle={{ width: "1px" }}
        />
      }
      // changePositionOnHover={true}
      boundsPadding={0}
      itemOne={
        <ReactCompareSliderImage
          alt="Image one"
          src={props.img1}
          style={{
            width: props.width,
            maxHeight: props.height,
            objectPosition: "50% 50%",
            display: "",
          }}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          alt="Image two"
          src={props.img2}
          style={{
            width: props.width,
            maxHeight: props.height,
            objectPosition: "50% 50%",
            display: "",
          }}
        />
      }
      position={50}
    />
  );
}
Myimageslider.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};
