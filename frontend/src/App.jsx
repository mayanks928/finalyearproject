import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import NavBar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
// import Colorization from "./components/Tools/Colorization/Colorization";
// import SuperResolution from "./components/Tools/SuperResolution/SuperResolution";
import ImageRestoration from "./components/Tools/ImageRestoration/ImageRestoration";
import Inpainting from "./components/Tools/Inpainting/Inpainting";
import Gallery from "./components/Gallery/Gallery";
import Layout from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const location = useLocation();
  return (
    <Provider store={store}>
      <Layout>
        <NavBar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<Register />} />
            {/* <Route path="/colorization" element={<Colorization />} />
            <Route path="/superresolution" element={<SuperResolution />} /> */}
            <Route path="/inpainting" element={<Inpainting />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/image_restoration" element={<ImageRestoration />} />
            image_restoration
          </Routes>
        </AnimatePresence>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </Layout>
    </Provider>
  );
}

export default App;
