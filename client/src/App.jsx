import "./App.css";
import HomePage from "./containers/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/auth.actions";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:slug" element={<ProductListPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
