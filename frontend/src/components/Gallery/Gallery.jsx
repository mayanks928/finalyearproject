import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Gallery.css";
import axios from "axios";
import refreshIcon from "./refresh.svg";
import gridIcon from "./grid.svg";
import PageTransition from "../../PageTransition";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { motion,AnimatePresence } from "framer-motion";

const Gallery = ({ isAuthenticated, userDetails }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [currentGalleryData, setCurrentGalleryData] = useState([]);
  const [display, setDisplay] = useState(false);
  const reverseOrder = () => {
    // Update the galleryData by reversing the array
    const reversedData = [...currentGalleryData].reverse();
    setCurrentGalleryData(reversedData);
  };
  const changeDisplay = () => {
    setDisplay(!display);
  };
  const apiUrl = `${
    import.meta.env.VITE_APP_API_URL
  }/imagehandling/user_gallery`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make API request
        const response = await axios.get(apiUrl, {
          withCredentials: true,
        });
        setGalleryData(response.data);
        setCurrentGalleryData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);
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
  const toolsUsed = [...new Set(galleryData.map((item) => item.task_name))];
  const filterItem = (curcat) => {
    const newItem = galleryData.filter((newVal) => {
      return newVal.task_name === curcat;
    });
    setCurrentGalleryData(newItem);
  };
  return (
    <PageTransition>
      <div className="galleryCard container-fluid">
        {isAuthenticated ? (
          <>
            <div className="detailsAndButtons">
              <div className="userDetails">
                <h2>
                  {userDetails.firstName} {userDetails.lastName}
                </h2>
                <p>{userDetails.email}</p>
              </div>
              <div className="galleryFilter">
                <p>Filters</p>
                {toolsUsed.map((Val, id) => {
                  return (
                    <button onClick={() => filterItem(Val)} key={id}>
                      {Val}
                    </button>
                  );
                })}
                <button onClick={() => setCurrentGalleryData(galleryData)}>
                  All
                </button>
                <p>
                  Current Filters:{" "}
                  {[
                    ...new Set(
                      currentGalleryData.map((item) => item.task_name)
                    ),
                  ].join(", ")}
                </p>
              </div>
              <div className="orderButton">
                <p>Reverse Order:</p>
                <button onClick={reverseOrder} className="reverseButton">
                  <img src={refreshIcon} className="reverseIcon" />
                </button>
                <p>Display Type:</p>
                <button onClick={changeDisplay} className="reverseButton">
                  <img src={gridIcon} className="reverseIcon" />
                </button>
              </div>
            </div>

            <div className="galleryItem">
            <AnimatePresence mode="wait">
              <Row className="py-4 justify-content-md-center" key={display}>
                {currentGalleryData.map((item) => (
                  <Col key={item.id} md={display ? "6" : "12"}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1,opacity:1 }}
                      exit={{ scale: 1,opacity:0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div key={item.id} className="imageContainer">
                        <p>{item.id}</p>
                        <div className="imagePair">
                          {" "}
                          <img
                            src={"http://localhost:8000/" + item.input_image}
                            // src={item.input_image}
                            alt={`Input ${item.id}`}
                          />
                          <img
                            src={"http://localhost:8000/" + item.output_image}
                            // src={item.output_image}
                            alt={`Output ${item.id}`}
                          />
                        </div>

                        <div className="details">
                          <p>Tool: {item.task_name}</p>
                          <p>Created At: {formatDateTime(item.created_at)}</p>
                        </div>
                        <hr />
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="guest">
            <h2>
              Please <Link to="/login">Login</Link> to view Gallery
            </h2>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userDetails: state.auth,
});

export default connect(mapStateToProps)(Gallery);
