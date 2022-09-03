import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "./../../components/UI/Card/index";
import CartItem from "./CartItem";
import "./style.css";

const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <Layout>
      <div className="container">
        <div className="cartContainer">
          <Card header_left="My Cart" header_right={<div>Deliver To</div>}>
            {cartItems &&
              cartItems.map((item, index) => (
                <CartItem key={index} item={item} />
              ))}
          </Card>
          <Card style={{ width: "500px" }}>Price</Card>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
