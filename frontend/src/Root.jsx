import {thunk} from "redux-thunk";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { routerMiddleware, ConnectedRouter } from "connected-react-router";
import rootReducer from "./components/Reducer"

// eslint-disable-next-line react/prop-types
const Root = ({ children, initialState = {} }) => {
  const history = createBrowserHistory();
  const middleware = [thunk, routerMiddleware(history)];

  const store = createStore(
    rootReducer(history),
    initialState,
    applyMiddleware(...middleware)
  );

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{children}</ConnectedRouter>
    </Provider>
  );
};

export default Root;
