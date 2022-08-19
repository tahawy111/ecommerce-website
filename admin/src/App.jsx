import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./containers/Home/index";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isUserLoggedIn } from "./actions/auth.actions";
import Category from "./containers/Category";
import { getInitialData } from "./actions/initialData.actions";
import NewPage from "./containers/NewPage/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = localStorage.getItem("token");

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      isUserLoggedIn(dispatch);
    }
    if (auth.authenticate) {
      getInitialData(dispatch);
    }
  }, [dispatch, auth.authenticate, auth.user.fullName]);

  useEffect(() => {
    if (auth.authenticate) {
      toast.success(`Hi ${auth.user.fullName}!`);
    }
  }, [auth]);

  return (
    <Routes>
      <Route path="/" element={token ? <Home /> : <Navigate to="/signin" />} />
      <Route
        path="/page"
        element={token ? <NewPage /> : <Navigate to="/signin" />}
      />
      <Route
        path="/products"
        element={token ? <Products /> : <Navigate to="/signin" />}
      />
      <Route
        path="/orders"
        element={token ? <Orders /> : <Navigate to="/signin" />}
      />
      <Route
        path="/category"
        element={token ? <Category /> : <Navigate to="/signin" />}
      />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
