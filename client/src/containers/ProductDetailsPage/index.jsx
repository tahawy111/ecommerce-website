import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions/product.actions";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import { generatePublicUrl } from "../../helpers/api";
import { addToCart } from "./../../actions/cart.actions";
const ProductDetailsPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.product);
  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => {
    dispatch(getProductDetailsById(productId));
  }, [productId, dispatch]);
  if (Object.keys(productDetails).length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {productDetails.productPictures.map((thumb, index) => (
              <div
                className={`thumbnail${index === imgIndex ? " active" : ""}`}
                key={index}
              >
                <img
                  src={generatePublicUrl(thumb.img)}
                  alt={thumb.img}
                  onClick={(e) => setImgIndex(index)}
                />
              </div>
            ))}
            {/* <div className="thumbnail active">
              {
                product.productDetails.productPictures.map((thumb, index) => 
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
              }
            </div> */}
          </div>
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                src={generatePublicUrl(
                  productDetails.productPictures[imgIndex].img
                )}
                alt={`${productDetails.productPictures[imgIndex].img}`}
              />
            </div>

            {/* action buttons */}
            <div className="flexRow">
              {/* <Link
                to="/cart"
                style={{ textDecoration: "none", width: "100%" }}
              > */}
              <MaterialButton
                bgcolor="#ff9f00"
                textcolor="#ffffff"
                style={{
                  marginRight: "5px",
                }}
                onClick={() => {
                  const { _id, name, price, quantity } = productDetails;
                  const img = productDetails.productPictures[0].img;
                  dispatch(
                    addToCart({ _id, name, qtyInStore: quantity, price, img })
                  );
                }}
              >
                <span style={{ marginRight: "10px" }}>
                  <IoMdCart size={20} />
                </span>
                <span>ADD TO CART</span>
              </MaterialButton>

              {/* </Link> */}
              <MaterialButton
                bgcolor="#fb641b"
                textcolor="#ffffff"
                style={{
                  marginLeft: "5px",
                }}
              >
                <span style={{ marginRight: "10px" }}>
                  <AiFillThunderbolt size={20} />
                </span>
                <span>BUY NOW</span>
              </MaterialButton>
            </div>
          </div>
        </div>
        <div>
          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li>
                <a href="/" style={{ pointerEvents: "none" }}>
                  Home
                </a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="/" style={{ pointerEvents: "none" }}>
                  Mobiles
                </a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="/" style={{ pointerEvents: "none" }}>
                  Samsung
                </a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="/" style={{ pointerEvents: "none" }}>
                  {productDetails.name}
                </a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{productDetails.name}</p>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72,234 Ratings & 8,140 Reviews
              </span>
            </div>
            <div className="extraOffer">
              Extra <BiRupee />
              4500 off{" "}
            </div>
            <div className="flexRow priceContainer">
              <span className="price">
                <BiRupee />
                {productDetails.price}
              </span>
              <span className="discount" style={{ margin: "0 10px" }}>
                22% off
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Available Offers
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Description
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}
                >
                  {productDetails.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
