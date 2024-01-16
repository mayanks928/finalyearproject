import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Gallery.css";
import axios from "axios";

const Gallery = ({ isAuthenticated, userDetails }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [currentGalleryData, setCurrentGalleryData] = useState([]);
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
    <div className="galleryCard">
      {isAuthenticated ? (
        <>
          <div className="userDetails">
            <h2>
              {userDetails.firstName} {userDetails.lastName}
            </h2>
            <p>{userDetails.email}</p>
          </div>
          <div className="galleryFilter">
            <p>Filter by tools:</p>
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
            <p>Current Filters: {[...new Set(currentGalleryData.map((item) => item.task_name))].join(", ")}</p>
          </div>
          <div className="galleryItem">
            {currentGalleryData.map((item) => (
              <div key={item.id} className="imageContainer">
                <p>{item.id}</p>
                <div className="imagePair">
                  {" "}
                  <img
                    // src={"http://localhost:8000/" + item.input_image}
                    src={item.input_image}
                    alt={`Input ${item.id}`}
                  />
                  <img
                    // src={"http://localhost:8000/" + item.output_image}
                    src={item.output_image}
                    alt={`Output ${item.id}`}
                  />
                </div>

                <div className="details">
                  <p>Tool: {item.task_name}</p>
                  <p>Created At: {formatDateTime(item.created_at)}</p>
                </div>
                <hr />
              </div>
            ))}
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
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userDetails: state.auth,
});

export default connect(mapStateToProps)(Gallery);
