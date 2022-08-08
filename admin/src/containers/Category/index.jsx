import Layout from "./../../components/Layout/index";
import "./style.css";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./../../components/UI/Input/index";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import NewModal from "../../components/UI/Modal";
import { addCategory } from "../../actions/category.actions";
import { IoCheckbox } from "react-icons/io5";
import { ImCheckboxUnchecked } from "react-icons/im";
import { IoIosArrowForward, IoIosArrowDown, IoMdTrash } from "react-icons/io";
import { FcFolder, FcOpenedFolder, FcCollapse, FcFile } from "react-icons/fc";
import { GoPencil } from "react-icons/go";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineCheckSquare } from "react-icons/ai";

const Category = () => {
  const categories = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
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
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    setUpdateCategoryModal(true);
    const categoriesList = createCategoryList(categories.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categoriesList.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categoriesList.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);

    console.log({
      checked,
      expanded,
      categories: categoriesList,
      checkedArray,
      expandedArray,
    });
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type === "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type === "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index === _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
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

              <Button
                variant="success"
                className="mt-3 fs-5 d-flex align-items-center"
                onClick={handleShow}
              >
                <BsPlusLg />
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <CheckboxTree
              nodes={renderCategories(categories.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoCheckbox />,
                uncheck: <ImCheckboxUnchecked />,
                halfCheck: <AiOutlineCheckSquare />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
                expandAll: <IoIosArrowDown />,
                collapseAll: <FcCollapse />,
                parentClose: <FcFolder />,
                parentOpen: <FcOpenedFolder />,
                leaf: <FcFile />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col className="mt-3 d-flex">
            <Button
              variant="danger"
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.5rem",
                marginRight: "1rem",
              }}
            >
              <IoMdTrash />
            </Button>
            <Button
              variant="warning"
              onClick={updateCategory}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.5rem",
                color: "white",
              }}
            >
              <GoPencil />
            </Button>
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

      {/* Edit Categories */}
      <NewModal
        show={updateCategoryModal}
        handleHide={() => setUpdateCategoryModal(false)}
        modalTitle="Update Category"
        handleClose={updateCategory}
        submitTitle="Update Category"
        size="lg"
      >
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={"Enter Category Name"}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control mb-2"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
                  <option defaultValue>Select Category</option>
                  {createCategoryList(categories.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
              {/* <Input
                type="file"
                placeholder={"Enter Category Image"}
                onChange={handleCategoryImage}
                label="Category Image"
                name="categoryImage"
              /> */}
            </Row>
          ))}
        <Row>
          <Col>
            <h6>Checked</h6>
          </Col>
        </Row>
        {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={"Enter Category Name"}
                  onChange={(e) =>
                    handleCategoryInput(
                      "name",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                />
              </Col>
              <Col>
                <select
                  className="form-control mb-2"
                  value={item.parentId}
                  onChange={(e) =>
                    handleCategoryInput(
                      "parentId",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
                  <option defaultValue>Select Category</option>
                  {createCategoryList(categories.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
              </Col>
              {/* <Input
                type="file"
                placeholder={"Enter Category Image"}
                onChange={handleCategoryImage}
                label="Category Image"
                name="categoryImage"
              /> */}
            </Row>
          ))}
      </NewModal>
    </Layout>
  );
};

export default Category;
