import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../../actions/product.actions";
import "./style.css";
import { generatePublicUrl } from "../../../helpers/api";
import { Link } from "react-router-dom";

const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { params } = props;
  useEffect(() => {
    dispatch(getProductBySlug(params.slug));
  }, [dispatch, params.slug]);

  return (
    <>
      {product.productsByPrice[0] !== undefined
        ? product.productsByPrice[0].map((product, index) => (
            <div className="card" key={index}>
              <div className="cardHeader">
                <div>{product.label}</div>
                <button className="cardBtn">View All</button>
              </div>
              <div style={{ display: "flex" }}>
                {product.list.map((product, _index) => (
                  <Link
                    to={`/${product.slug}/${product._id}/p`}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: "#000",
                      border: "1px solid #cecece",
                      borderRadius: "10px",
                    }}
                  >
                    <div className="productContainer" key={_index}>
                      <div className="productImgContainer">
                        <img
                          src={generatePublicUrl(
                            product.productPictures[0].img
                          )}
                          alt=""
                        />
                      </div>
                      <div className="productInfo">
                        <div style={{ margin: "5px 0" }}>{product.name}</div>
                        <div>
                          <span>4.3</span>
                          <span> (5254)</span>
                        </div>
                        <div className="productPrice">{product.price}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default ProductStore;
