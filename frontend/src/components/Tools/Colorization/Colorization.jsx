import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../tools.css";
import "./Colorization.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthenticatedColorization = () => {
  const [inputImage, setinputImage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // const apiUrl = `${import.meta.env.VITE_APP_API_URL}/accounts/register`;
  const apiUrl = `${import.meta.env.VITE_APP_API_URL}/imagehandling/image_process`;
  const uploadImage = async (imageFile) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("input_image", imageFile);
    formData.append('taskName', "Colorization");
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        withCredentials: true, 
      });
      console.log(response.data);
      setSuccess(true);
    } catch (error) {
      // Handle errors
      console.error("Error uploading image:", error);
      setLoading(false);
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
      <div className="colorizationCard">
        <div className="colorizationForm">
          <Form onSubmit={handleSubmit}>
            {loading && <div>Loading...</div>}
            {success && <div>Image processed successfully! Reloading...</div>}
            <Form.Group className="mb-4 form-group">
              <Form.Label>Upload image to be colorized</Form.Label>
              {previewImage}
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
const Colorization = ({ isAuthenticated }) => {
  return (
    <div className="toolCard">
      {isAuthenticated ? (
        <AuthenticatedColorization />
      ) : (
        <h2>
          Please <Link to="/login">Login</Link> to Access this feature
        </h2>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Colorization);
