import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../tools.css";
import "./ImageRestoration.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import PageTransition from "../../../PageTransition";
import { useRef } from "react";


const AuthenticatedImageRestoration = () => {
  const [inputImage, setinputImage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const toastId = useRef(null);


  // const apiUrl = `${import.meta.env.VITE_APP_API_URL}/accounts/register`;
  const apiUrl = `${
    import.meta.env.VITE_APP_API_URL
  }/imagehandling/image_process`;
  const uploadImage = async (imageFile) => {
    // toast.info("Starting with image processing.");

    const formData = new FormData();
    formData.append("input_image", imageFile);
    formData.append("taskName", "Restoration");
    toastId.current = toast.loading(
      "Processing Image. Takes around 10-20 seconds..."
    );
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        withCredentials: true,
      });
      console.log(response.data);
      toast.update(toastId.current, {
        render:
          "Image Uploaded and Processed. Head to Gallery to check results.",
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } catch (error) {
      toast.update(toastId.current, {
        render: "Error Loading. Try Again.",
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
      // Handle errors
      console.error("Error uploading image:", error);
    }
  };

  // const [isSuccess, setIsSuccess] = useState(false);

  const previewImage = inputImage && !isError && (
    <img
      src={URL.createObjectURL(inputImage)}
      alt="Preview"
      className="img-preview"
    />
  );
  const handleFileChange = (event) => {
    const selectedinputImage = event.target.files[0];
    // setIsSuccess(false);
    console.log(selectedinputImage);
    // Checking if the file type is allowed or not
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(selectedinputImage?.type)) {
      setIsError(true);
      setErrorMsg("Only JPEG, JPG and PNG images are allowed.");
      return;
    }

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
      <div className="imageRestorationCard">
        <div className="imageRestorationForm">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4 form-group">
              <Form.Label>
                Upload image for restoration. (*Model trained specifically for
                face images.){" "}
              </Form.Label>
              <Form.Control
                type="file"
                name="inputImage"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                isInvalid={isError}
              />
              {previewImage}
              <Form.Control.Feedback type="invalid">
                {errorMsg}
              </Form.Control.Feedback>
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
const ImageRestoration = ({ isAuthenticated }) => {
  return (
    <PageTransition>
      <div className="toolCard">
        {isAuthenticated ? (
          <AuthenticatedImageRestoration />
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

export default connect(mapStateToProps)(ImageRestoration);
