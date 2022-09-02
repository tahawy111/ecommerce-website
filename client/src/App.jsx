import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/auth.actions";
import HomePage from "./containers/HomePage";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import ProductListPage from "./containers/ProductListPage";
import CartPage from "./containers/CartPage";
import { getCartById } from "./actions/cart.actions";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(isUserLoggedIn());
      dispatch(getCartById(auth.user._id));
    }
  }, [auth.authenticate, dispatch]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:slug" element={<ProductListPage />} />
          <Route
            path="/:productSlug/:productId/p"
            element={<ProductDetailsPage />}
          />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
