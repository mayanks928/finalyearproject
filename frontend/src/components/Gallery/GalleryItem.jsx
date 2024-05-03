import { motion } from "framer-motion";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import trashIcon from "./trash.svg";
import displayIcon from "./square-half.svg";
import ImageSlider from "./ImageSlider";
import { toast } from "react-toastify";
import { useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

export default function GalleryItem(props) {
  // console.log(props.item);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sliderDisplay, setSliderDisplay] = useState(false);
  const formatDateTime = (dateTimeString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    return new Date(dateTimeString).toLocaleString(undefined, options);
  };
  const toastId = useRef(null);
  const apiUrl = `${
    import.meta.env.VITE_APP_API_URL
  }/imagehandling/image_delete`;

  const deleteItem = async (imageId) => {
    toastId.current = toast.loading("Deleting image...");
    try {
      await axios.delete(`${apiUrl}/${imageId}`, {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        withCredentials: true,
      });
      toast.update(toastId.current, {
        render: "Image deleted successfully. Changes reflected on page reload.",
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
      // window.location.reload();
      // console.log("Image deleted successfully. Reload to see changes");
    } catch (error) {
      // Handle errors
      toast.update(toastId.current, {
        render: "Error deleting. Try Again.",
        type: toast.TYPE.ERROR,
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
      // console.error("Error deleting image:", error);
    }
  };
  const handleDelete = () => {
    // Call the deleteItem function if user confirms
    deleteItem(props.item.id);
    // Close the confirmation modal
    setShowConfirmation(false);
  };
  return (
    <Col key={props.item.id} md={props.display ? "6" : "12"}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div key={props.item.id} className="imageContainer">
          {sliderDisplay && (
            <ImageSlider
              img1={"http://localhost:8000/" + props.item.input_image}
              img2={"http://localhost:8000/" + props.item.output_image}
              maxHeight="100vh"
            />
          )}
          {!sliderDisplay && (
            <div className="imagePair">
              {" "}
              <img
                src={"http://localhost:8000/" + props.item.input_image}
                // src={item.input_image}
                alt={`Input ${props.item.id}`}
              />
              <img
                src={"http://localhost:8000/" + props.item.output_image}
                // src={item.output_image}
                alt={`Output ${props.item.id}`}
              />
            </div>
          )}

          <div className="details">
            <p>Tool: {props.item.task_name}</p>
            <p>Created At: {formatDateTime(props.item.created_at)}</p>
          </div>
          <button
            onClick={() => {
              setShowConfirmation(true);
            }}
            className="galleryItemButton"
          >
            <img src={trashIcon} className="reverseIcon" />
          </button>
          <Modal
            show={showConfirmation}
            onHide={() => setShowConfirmation(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          <button
            onClick={() => {
              setSliderDisplay(!sliderDisplay);
            }}
            className={
              sliderDisplay
                ? "galleryItemButton sliderClicked"
                : "galleryItemButton"
            }
          >
            <img src={displayIcon} className="reverseIcon" />
          </button>
          <hr />
        </div>
      </motion.div>
    </Col>
  );
}
