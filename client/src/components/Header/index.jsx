import "./style.css";
import flipkart from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";
import { FaSearch } from "react-icons/fa";
const index = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="left">
          <img src={flipkart} alt="" className="logo" />
          <div className="more-details-logo">
            <span>
              Explore <span>Plus</span>
            </span>
            <img src={goldenStar} alt="" className="logo" />
          </div>
        </div>
        <div className="center">
          <input
            className="input"
            type="text"
            placeholder="Search for products, brands and more"
          />
          <span className="search-icon">
            <FaSearch />
          </span>
        </div>
        <div className="right">
          <button className="btn">Login</button>
          <a href="/">Become a Seller</a>
        </div>
      </div>
    </div>
  );
};

export default index;
