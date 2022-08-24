import "./style.css";
import { BsChevronDown } from "react-icons/bs";
const Dropdown = (props) => {
  const { show, mainTitle, menu } = props;
  return (
    <span {...props}>
      <li
        className="mainTitle"
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <BsChevronDown style={{ marginRight: "3px", fontSize: "18px" }} />
        {mainTitle}
      </li>
      <div style={{ display: show ? "block" : "none" }}>
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
