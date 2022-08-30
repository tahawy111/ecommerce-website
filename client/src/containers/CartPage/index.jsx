import Layout from "../../components/Layout";
import Card from "./../../components/UI/Card/index";
import "./style.css";

const CartPage = () => {
  return (
    <Layout>
      <div className="cartContainer">
        <Card header_left="My Cart" header_right={<div>Deliver To</div>}>
          <div className="flexRow">
            <div className="cartProductContainer">
              <img src="" alt="" />
            </div>
            <div className="cartItemDetails">
              <div>Product Name</div>
              <div>Delivary in 3 - 5 days</div>
            </div>
          </div>
        </Card>
        <Card style={{ width: "500px" }}>Price</Card>
      </div>
    </Layout>
  );
};

export default CartPage;
