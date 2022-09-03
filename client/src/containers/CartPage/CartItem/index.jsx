import { generatePublicUrl } from "../../../helpers/api";
import "./style.css";
import { useState } from "react";
import { MaterialButton } from "../../../components/MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQty } from "../../../actions/cart.actions";

const CartItem = (props) => {
  const { item, key } = props;
  const [qty, setQty] = useState(item.quantity);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
          <MaterialButton
            bgcolor="#ff9f00"
            textcolor="#ffffff"
            onClick={() => {
              dispatch(updateCartQty(auth.user._id, item._id, qty));
            }}
          >
            Update
          </MaterialButton>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
