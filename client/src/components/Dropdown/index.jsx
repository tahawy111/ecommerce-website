import "./style.css";
import { BsChevronDown } from "react-icons/bs";
const Dropdown = (props) => {
  const { show, maintitle, menu, menuref } = props;

  return (
    <span {...props} ref={menuref}>
      <li
        className="mainTitle"
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <BsChevronDown style={{ marginRight: "3px", fontSize: "18px" }} />
        {maintitle}
      </li>
      <div
        style={{
          display: show === "true" ? "block" : "none",
        }}
      >
        {menu.map((menu, index) => (
          <li key={index}>
            <a
              href={menu.href}
              style={{
                pointerEvents: menu.href ? "auto" : "none",
                color: "black",
              }}
            >
              {menu.title}
            </a>
          </li>
        ))}
      </div>
    </span>
  );
};

export default Dropdown;
