import { useEffect, useState } from "react";
import Layout from "./../../components/Layout/index";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "./../../actions/product.actions";
import { useParams } from "react-router-dom";

import "./style.css";
import { generatePublicUrl } from "../../helpers/api";

const ProductListPage = () => {
  const { slug } = useParams();
  const slugName = slug.split("-")[0];
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductBySlug(slug));
  }, [dispatch, slug]);

  return (
    <Layout>
      {product.productsByPrice[0].map((product, index) => (
        <div className="card" key={index}>
          <div className="cardHeader">
            <div>
              {slugName} {product.label}
            </div>
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
      ))}
    </Layout>
  );
};

export default ProductListPage;
