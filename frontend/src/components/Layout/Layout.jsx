import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated } from "../../actions/auth";

const Layout = ({ children, checkAuthenticated }) => {
  useEffect(() => {
    checkAuthenticated();
  }, []);
  return <Fragment>{children}</Fragment>;
};

export default connect(null, { checkAuthenticated })(Layout);
