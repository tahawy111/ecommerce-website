import Layout from "../../components/Layout/index";
import { useParams } from "react-router-dom";
import "./style.css";
import ProductStore from "./ProductStore/index";
import getQuery from "./../../utils/getQuery";
import ProductPage from "./ProductPage";

const ProductListPage = (props) => {
  const params = useParams();
  const renderProduct = () => {
    const query = getQuery(window.location.search);
    let content = null;
    switch (query.type) {
      case "store":
        content = <ProductStore params={params} />;
        break;
      case "page":
        content = <ProductPage />;
        break;

      default:
        // eslint-disable-next-line no-unused-vars
        content = null;
    }

    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
