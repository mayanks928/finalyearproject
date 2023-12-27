import { ReactCompareSliderImage } from "react-compare-slider";
import { ReactCompareSlider } from "react-compare-slider";
import { ReactCompareSliderHandle } from "react-compare-slider";
import { useState, useEffect } from "react";
import SampleImage from "../../assets/mountain.jpg";
import SampleImageNoised from "../../assets/mountainnoised.jpg";
import "./Myimageslider.css";
import PropTypes from "prop-types";
export default function Myimageslider(props) {
  const [showSlider, setShowSlider] = useState(false);
  useEffect(() => {
    setShowSlider(true);
  }, []);
  return (
    <ReactCompareSlider
      className={`homeSlider1 ${showSlider ? "show" : ""}`}
      handle={
        <ReactCompareSliderHandle
          buttonStyle={{ display: "none" }}
          linesStyle={{ width: "1px" }}
        />
      }
      changePositionOnHover={true}
      boundsPadding={0}
      itemOne={
        <ReactCompareSliderImage
          alt="Image one"
          src={SampleImageNoised}
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
          src={SampleImage}
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
