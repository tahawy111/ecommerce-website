import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "./../../components/UI/Card/index";
import "./style.css";

const CartPage = () => {
  const { cart } = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <Layout>
      <div className="cartContainer">
        <Card header_left="My Cart" header_right={<div>Deliver To</div>}>
          {cartItems &&
            cartItems.map((item, index) => (
              <div key={index} className="flexRow">
                <div className="cartProductContainer">
                  <img src="" alt="" />
                </div>
                <div className="cartItemDetails">
                  <div>
                    {item.name} Qty - {item.quantity}
                  </div>
                  <div>Delivary in 3 - 5 days</div>
                </div>
              </div>
            ))}
        </Card>
        <Card style={{ width: "500px" }}>Price</Card>
      </div>
    </Layout>
  );
};

export default CartPage;
