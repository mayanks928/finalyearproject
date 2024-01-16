import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import NavBar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Colorization from "./components/Tools/Colorization/Colorization";
import SuperResolution from "./components/Tools/SuperResolution/SuperResolution";
import Inpainting from "./components/Tools/Inpainting/Inpainting";
import Gallery from "./components/Gallery/Gallery";
import Layout from "./components/Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<Register />} />
            <Route path="/colorization" element={<Colorization />} />
            <Route path="/superresolution" element={<SuperResolution />} />
            <Route path="/inpainting" element={<Inpainting />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
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
      </BrowserRouter>
    </Provider>
  );
}

export default App;
