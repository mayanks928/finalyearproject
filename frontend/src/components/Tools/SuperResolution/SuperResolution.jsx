import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../tools.css";
import PageTransition from "../../../PageTransition";

const SuperResolution = ({ isAuthenticated }) => {
  return (
    <PageTransition>
      <div className="toolCard">
        {isAuthenticated ? (
          <h2>Authenticated Content for SuperResolution</h2>
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

export default connect(mapStateToProps)(SuperResolution);
