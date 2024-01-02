import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Gallery.css";

const Gallery = ({ isAuthenticated, userDetails }) => {
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
