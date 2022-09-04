import { generatePublicUrl } from "../../../helpers/api";
import "./style.css";
import { useState } from "react";
import { MaterialButton } from "../../../components/MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { updateCartQty } from "../../../actions/cart.actions";

const CartItem = (props) => {
  const { item, _key } = props;
  const [qty, setQty] = useState(item.quantity);
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  return (
    <div key={_key} className="flexRow">
      <div className="cartProImgContainer">
        <img src={generatePublicUrl(item.img)} alt="" />
      </div>
      <div className="cartItemDetails">
        <div>
          <p>{item.name}</p>
          <p>{item.price.toLocaleString()}$</p>
        </div>
      </div>
      <div style={{ display: "flex", margin: "5px 0" }}>
        <div className="quantityControl">
          <label htmlFor="qtyInput">Quantity: </label>
          <input
            type="number"
            id="qtyInput"
            value={qty}
            onChange={(e) => {
              setQty(e.target.value);
              setShowUpdateBtn(true);
            }}
          />
          <MaterialButton
            bgcolor="#ff9f00"
            textcolor="#ffffff"
            style={{ visibility: showUpdateBtn ? "visible" : "hidden" }}
            onClick={() => {
              dispatch(updateCartQty(auth.user._id, item._id, qty)).then(() => {
                setShowUpdateBtn(false);
              });
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
