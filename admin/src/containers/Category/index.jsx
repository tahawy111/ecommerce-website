import Layout from "./../../components/Layout/index";
import "./style.css";
// import { NavLink } from "react-router-dom";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "./../../components/UI/Input/index";

import NewModal from "../../components/UI/Modal";
import { addCategory } from "../../actions/category.actions";

const Category = () => {
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = async () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    addCategory(dispatch, form);

    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const renderCategories = (categories) => {
    let myCategories = [];

    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  return (
    <Layout sidebar>
      <Container fluid>
        {categories.loading && <h5 className="text-center">Loading...</h5>}
        {categories.error && <Alert variant="danger">{categories.error}</Alert>}
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <h3>Category</h3>

              <Button variant="primary" className="mt-3" onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategories(categories.categories)}</ul>
          </Col>
        </Row>
      </Container>

      <NewModal
        show={show}
        handleHide={() => setShow(false)}
        modalTitle="Add New Category"
        handleClose={handleClose}
        submitTitle="Add New Category"
      >
        <Input
          value={categoryName}
          placeholder={"Enter Category Name"}
          onChange={(e) => setCategoryName(e.target.value)}
          label="Category Name"
        />

        <select
          className="form-control mb-2"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option defaultValue>Select Category</option>
          {createCategoryList(categories.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <Input
          type="file"
          placeholder={"Enter Category Image"}
          onChange={handleCategoryImage}
          label="Category Image"
          name="categoryImage"
        />
      </NewModal>
    </Layout>
  );
};

export default Category;
