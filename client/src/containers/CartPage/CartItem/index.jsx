import { generatePublicUrl } from "../../../helpers/api";
import "./style.css";
import { useState } from "react";

const CartItem = (props) => {
  const { item, key } = props;
  const [qty, setQty] = useState(item.quantity);
  return (
    <div key={key} className="flexRow">
      <div className="cartProImgContainer">
        <img src={generatePublicUrl(item.img)} alt="" />
      </div>
      <div className="cartItemDetails">
        <div>
          <p>{item.name}</p>
          <p>{item.price}$</p>
        </div>
        <div>Delivary in 3 - 5 days</div>
      </div>
      <div style={{ display: "flex", margin: "5px 0" }}>
        <div className="quantityControl">
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
