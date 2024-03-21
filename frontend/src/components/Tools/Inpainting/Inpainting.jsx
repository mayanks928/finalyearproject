/* eslint-disable no-unused-vars */
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../tools.css";
import "./Inpainting.css";
import axios from "axios";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import PageTransition from "../../../PageTransition";
import CanvasDraw from "react-canvas-draw";
import { useRef } from "react";

const AuthenticatedInpainting = () => {
  const [inputImage, setinputImage] = useState(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 400,
    height: 600,
  });
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const toastId = useRef(null);

  const [sampleImage, setSampleImage] = useState(null);

  const canvasRef = useRef();
  // const apiUrl = `${import.meta.env.VITE_APP_API_URL}/accounts/register`;
  const apiUrl = `${
    import.meta.env.VITE_APP_API_URL
  }/imagehandling/image_process`;
  const uploadImage = async (imageFile) => {
    // toast.info("Starting with image processing.");
    toastId.current = toast.loading(
      "Processing Image. Takes around 10-20 seconds..."
    );
    const formData = new FormData();
    formData.append("input_image", imageFile);
    formData.append("taskName", "Inpainting");
    // formData.append("imageMask", sampleImage);
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        withCredentials: true,
      });
      console.log(response.data);
      // toast.success(
      //   "Image Uploaded and Processed. Head to Gallery to check results."
      // );
      toast.update(toastId.current, {
        render:
          "Image Uploaded and Processed. Head to Gallery to check results.",
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } catch (error) {
      // Handle errors
      toast.update(toastId.current, {
        render: "Error Loading. Try Again.",
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
      console.error("Error uploading image:", error);
    }
  };
  const getDimensions = (image, callback) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        console.log(`Width: ${width}, Height: ${height}`);
        callback({ width, height });
      };
    };

    reader.readAsDataURL(image);
  };

  const maskReset = () => {
    canvasRef.current.eraseAll();
  };
  const maskUndo = () => {
    canvasRef.current.undo();
  };
  const maskLog = () => {
    // console.log(canvasRef.current.getSaveData())
    // console.log(canvasRef);
    const maskData = canvasRef.current.getDataURL("png");
    // console.log(maskData);
    setSampleImage(maskData);
  };
  // const [isSuccess, setIsSuccess] = useState(false);
  const previewImage = inputImage && !isError && (
    // <div className="drawingcanvas">
    //   <p>Draw the inpainting mask on the given canvas</p>
    //   <Button className="canvasButton" onClick={maskReset} type="button">
    //     Clear
    //   </Button>
    //   <Button className="canvasButton" onClick={maskUndo} type="button">
    //     Undo
    //   </Button>
    //   <div className="canvasDiv">
    //     <div>
    //       <CanvasDraw
    //         onChange={maskLog}
    //         className="canvasElement"
    //         brushColor="#000000"
    //         brushRadius={10}
    //         canvasWidth={Math.min(imageDimensions.width, 400)}
    //         canvasHeight={
    //           (Math.min(imageDimensions.width, 400) / imageDimensions.width) *
    //           imageDimensions.height
    //         }
    //         hideGrid={true}
    //         ref={canvasRef}
    //         imgSrc={URL.createObjectURL(inputImage)}
    //         loadTimeOffset={2}
    //       />
    //       <p>Canvas</p>
    //     </div>
    //     {!isError && sampleImage && (
    //       <div>
    //         <img className="img-preview" src={sampleImage} />
    //         <p>Mask Preview</p>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <img className="img-preview" src={URL.createObjectURL(inputImage)} />
  );
  const handleFileChange = async (event) => {
    const selectedinputImage = event.target.files[0];
    console.log(selectedinputImage);
    // Checking if the file type is allowed or not
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(selectedinputImage?.type)) {
      setIsError(true);
      setErrorMsg("Only JPEG, JPG and PNG images are allowed.");
      return;
    }
    // try {
    //   const dimensions = await new Promise((resolve) => {
    //     getDimensions(selectedinputImage, resolve);
    //   });

    //   // Set the dimensions in the state
    //   setImageDimensions(dimensions);

    //   // Continue with the rest of your logic
    //   setIsError(false);
    //   setinputImage(selectedinputImage);
    // } catch (error) {
    //   console.error("Error getting dimensions:", error);
    //   setIsError(true);
    //   setErrorMsg("Error getting image dimensions");
    // }
    // Continue with the rest of your logic
    setIsError(false);
    setinputImage(selectedinputImage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isError) return;
    setErrorMsg("");

    // Checking if the file has been selected
    if (!inputImage) {
      setIsError(true);
      setErrorMsg("Please select a file.");
      return;
    }
    uploadImage(inputImage);
    setIsError(false);
    // setIsSuccess(true);
  };
  return (
    <>
      <div className="inpaintingCard">
        <div className="inpaintingForm">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4 form-group">
              <Form.Label>Upload image that requires inpainting</Form.Label>

              <Form.Control
                type="file"
                name="inputImage"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                isInvalid={isError}
              />
              <Form.Control.Feedback type="invalid">
                {errorMsg}
              </Form.Control.Feedback>
              {previewImage}
            </Form.Group>

            <Button disabled={isError} type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};
const Inpainting = ({ isAuthenticated }) => {
  return (
    <PageTransition>
      <div className="toolCard">
        {isAuthenticated ? (
          <AuthenticatedInpainting />
        ) : (
          <h2>
            Please <Link to="/login">Login</Link> to Access this feature
          </h2>
        )}
      </div>
    </PageTransition>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Inpainting);
