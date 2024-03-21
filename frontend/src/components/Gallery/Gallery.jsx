import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Gallery.css";
import axios from "axios";
import refreshIcon from "./refresh.svg";
import gridIcon from "./grid.svg";
import PageTransition from "../../PageTransition";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import { AnimatePresence } from "framer-motion";
import GalleryItem from "./GalleryItem";


const Gallery = ({ isAuthenticated, userDetails }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [currentGalleryData, setCurrentGalleryData] = useState([]);
  const [cgdChanged, setCgdChanged] = useState(false);
  const [display, setDisplay] = useState(true);
  const reverseOrder = () => {
    // Update the galleryData by reversing the array
    const reversedData = [...currentGalleryData].reverse();
    setCurrentGalleryData(reversedData);
    setCgdChanged(!cgdChanged);
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
                <button onClick={reverseOrder} className="galleryButton">
                  <img src={refreshIcon} className="reverseIcon" />
                </button>
                <p>Display Type:</p>
                <button onClick={changeDisplay} className="galleryButton">
                  <img src={gridIcon} className="reverseIcon" />
                </button>
              </div>
            </div>

            <div className="galleryItem">
            <AnimatePresence mode="wait">
              <Row className="py-4 justify-content-md-center galleryRow" key={[cgdChanged,display]}>
                {currentGalleryData.map((item) => (
                  <GalleryItem key={item.id} item={item} display={display} />
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
