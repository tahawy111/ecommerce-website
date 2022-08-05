import { useEffect, useState } from "react";
import Layout from "./../../components/Layout/index";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "./../../actions/product.actions";
import { useParams } from "react-router-dom";

import "./style.css";

const ProductListPage = () => {
  const { slug } = useParams();
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [productsDetails, setProductsDetails] = useState(null);
  console.log(product);
  useEffect(() => {
    dispatch(getProductBySlug(slug));
    setProductsDetails(product);
  }, []);

  if (!productsDetails) {
    return <div>no</div>;
  }
  const keys = Object.keys(productsDetails.productsByPrice);

  return <Layout>{keys.map((key, index) => key)}</Layout>;
};

export default ProductListPage;
