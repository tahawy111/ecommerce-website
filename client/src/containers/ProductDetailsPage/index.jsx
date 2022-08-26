import { useEffect } from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions/product.actions";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProductDetailsById(productId));
  }, [productId, dispatch]);
  return <Layout>{productDetails.name}</Layout>;
};

export default ProductDetailsPage;
