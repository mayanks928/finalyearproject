import { ReactCompareSliderImage } from "react-compare-slider";
import { ReactCompareSlider } from "react-compare-slider";
import { ReactCompareSliderHandle } from "react-compare-slider";
import { useState, useEffect } from "react";
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
        height: props.height,
        maxwidth: props.width,
      }}
    />
  );
}
Myimageslider.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};
