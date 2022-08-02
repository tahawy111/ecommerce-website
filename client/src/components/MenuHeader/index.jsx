import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "./../../actions/category.actions";

const MenuHeader = (props) => {
  const category = useSelector((state) => state.category);
  console.log(category);
  const dispatch = useDispatch();

  useEffect(() => {});

  // const renderCategories = (categories) => {
  //   let myCategories = [];

  //   for (let category of categories) {
  //     myCategories.push(
  //       <li key={category.name}>
  //         {category.name}
  //         {category.children.length > 0 ? (
  //           <ul>{renderCategories(category.children)}</ul>
  //         ) : null}
  //       </li>
  //     );
  //   }
  //   return myCategories;
  // };

  return <div className="menuHeader"></div>;
};

export default MenuHeader;
