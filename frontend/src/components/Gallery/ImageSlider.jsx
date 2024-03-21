import { ReactCompareSliderImage } from "react-compare-slider";
import { ReactCompareSlider } from "react-compare-slider";
import { ReactCompareSliderHandle } from "react-compare-slider";

export default function ImageSlider(props) {
  return (
    <ReactCompareSlider
      style={{ border: "1px solid white" }}
      //   className={`homeSlider1 ${showSlider ? "show" : ""}`}
      handle={
        <ReactCompareSliderHandle
          style={{ color: "yellow" }}
          linesStyle={{ width: "1px" }}
        />
      }
      //   changePositionOnHover={true}
      boundsPadding={0}
      itemOne={
        <ReactCompareSliderImage
          alt="Before Image"
          src={props.img1}
          style={{
            // width: props.width,
            maxHeight: props.maxHeight,
            objectPosition: "50% 50%",
            display: "",
          }}
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          alt="After Image"
          src={props.img2}
          style={{
            // width: props.width,
            maxHeight: props.maxHeight,
            objectPosition: "50% 50%",
            display: "",
          }}
        />
      }
      position={50}
    />
  );
}
