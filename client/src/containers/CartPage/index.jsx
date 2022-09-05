import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { MaterialButton } from "../../components/MaterialUI";
import Card from "./../../components/UI/Card/index";
import CartItem from "./CartItem";
import "./style.css";

const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container">
        <div className="cartContainer">
          <Card header_left="My Cart" header_right={<div>Deliver To</div>}>
            {cartItems &&
              cartItems.map((item, index) => (
                <CartItem key={index} _key={index} item={item} />
              ))}
            <div
              style={{
                borderTop: "1px solid #cecece",
                margin: "5px 5px 0 5px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {" "}
                TotalQuantity: {cart.totalQuantity}, TotalPrice:{" "}
                {cart.totalPrice && cart.totalPrice.toLocaleString()}$
              </span>
              <MaterialButton
                bgcolor="#fb641b"
                textcolor="#ffffff"
                style={{ width: "fit-content" }}
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                Place Order
              </MaterialButton>
            </div>
          </Card>
          <Card style={{ width: "500px" }}>Price</Card>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
