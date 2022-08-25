import { useEffect, useState } from "react";
import "./style.css";
import flipkart from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";
import { FaSearch } from "react-icons/fa";
import Dropdown from "../Dropdown";
import { useRef } from "react";

const Header = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!menuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    });
  });
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
          <Dropdown
            className="ml-5"
            show={showAccountMenu.toString()}
            maintitle="My Account"
            menuref={menuRef}
            onClick={() =>
              showAccountMenu
                ? setShowAccountMenu(false)
                : setShowAccountMenu(true)
            }
            menu={[
              { title: "My Profile", href: "/" },
              { title: "Flipkart Plus Zone", href: "/" },
              { title: "Orders", href: "/" },
              { title: "Wishlist", href: "/" },
              { title: "Rewards" },
              { title: "Gift Cards", href: "/" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
