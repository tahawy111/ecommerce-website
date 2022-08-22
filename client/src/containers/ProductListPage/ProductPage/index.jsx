import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions/product.actions";
import getQuery from "../../../utils/getQuery";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Card from "./../../../components/UI/Card/index";

const ProductPage = () => {
  const { page } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = getQuery(window.location.search);
    dispatch(getProductPage(payload));
  }, []);
  return (
    <div style={{ margin: "0 10px" }}>
      <h2>{page.title}</h2>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              key={index}
              style={{ display: "block" }}
              href={banner.navigateTo}
            >
              <img
                style={{ width: "100vw", height: "70vh", objectFit: "cover" }}
                src={banner.img}
                alt=""
              />
            </a>
          ))}
      </Carousel>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "5px",
        }}
      >
        {page.products &&
          page.products.map((product, index) => (
            <Card
              key={index}
              style={{ width: "400px", height: "200px", margin: "0 5px" }}
            >
              <img
                src={product.img}
                style={{ width: "100%", height: "100%" }}
                alt=""
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
