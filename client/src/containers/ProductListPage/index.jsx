import { useEffect, useState } from "react";
import Layout from "./../../components/Layout/index";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "./../../actions/product.actions";
import { useParams } from "react-router-dom";

import "./style.css";
import { generatePublicUrl } from "../../helpers/api";

const ProductListPage = () => {
  const { slug } = useParams();
  const productss = useSelector((state) => state.product);
  const [products, setProducts] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductBySlug(slug));
    setProducts(productss);
  }, [dispatch, slug]);

  console.log(products);

  return (
    <Layout>
      {/* {products.productsByPrice.map((product, index) => (
        <div className="card" key="index">
          <div className="cardHeader">
            <div>Label</div>
            <button className="cardBtn">View All</button>
          </div>
          <div style={{ display: "flex" }}>
            <div className="productContainer">
              <div className="productImgContainer">
                <img
                  src="../../-AopznEa9T-apple-iphone-12-dummyapplefsn-original-imafwg8dqq7z8cgh(1).webp"
                  alt=""
                />
              </div>
              <div className="productInfo">
                <div style={{ margin: "5px 0" }}>product name</div>
                <div>
                  <span>4.3</span>
                  <span> (5254)</span>
                </div>
                <div className="productPrice">50000$</div>
              </div>
            </div>
          </div>
        </div>
      ))} */}

      {/* {products.productsByPrice.map((product, index) => (
        <div className="card" key={index}>
          <div className="cardHeader">
            <div>{product.label}</div>
            <button className="cardBtn">View All</button>
          </div>
          <div style={{ display: "flex" }}>
            {product.list.map((product) => (
              <div className="productContainer">
                <div className="productImgContainer">
                  <img
                    src={generatePublicUrl(product.productPictures[0].img)}
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
            ))}
          </div>
        </div>
      ))} */}
    </Layout>
  );
};

export default ProductListPage;
