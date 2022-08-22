import Layout from "../../components/Layout/index";
import { useParams } from "react-router-dom";
import "./style.css";
import ProductStore from "./ProductStore/index";

const ProductListPage = (props) => {
  const params = useParams();
  return (
    <Layout>
      <ProductStore params={params} location={window.location} />
    </Layout>
  );
};

export default ProductListPage;
