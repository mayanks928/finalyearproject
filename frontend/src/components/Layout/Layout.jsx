import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthenticated } from "../../actions/auth";
import { useTheme } from "../../ThemeContext";

const Layout = ({ children, checkAuthenticated }) => {
  const { theme } = useTheme();
  useEffect(() => {
    checkAuthenticated();
  }, []);
  return (
    <Fragment>
      <div className={`${theme}`}>{children}</div>
    </Fragment>
  );
};

export default connect(null, { checkAuthenticated })(Layout);
