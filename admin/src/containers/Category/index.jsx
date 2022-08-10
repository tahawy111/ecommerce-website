import Layout from "./../../components/Layout/index";
import "./style.css";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./../../components/UI/Input/index";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import NewModal from "../../components/UI/Modal";
import {
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions/category.actions";
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
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

  // Functions
  const handleClose = async () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    addCategory(dispatch, form);

    setShow(false);
  };

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
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
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

  const updateCategoriesForm = () => {
    setUpdateCategoryModal(false);
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form));
  };

  const renderUpdateCategoriesModal = () => {
    return (
      <NewModal
        show={updateCategoryModal}
        handleHide={() => setUpdateCategoryModal(false)}
        modalTitle="Update Category"
        handleClose={updateCategoriesForm}
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
                <select
                  className="form-control"
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "expanded"
                    )
                  }
                >
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
            <h6>Checked Categories</h6>
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
                <select
                  className="form-control"
                  onChange={(e) =>
                    handleCategoryInput(
                      "type",
                      e.target.value,
                      index,
                      "checked"
                    )
                  }
                >
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
    );
  };

  const renderAddCategoryModal = () => {
    return (
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
    );
  };

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));

    const idsArray = expandedIdsArray.concat(checkedIdsArray);

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray));
      setDeleteCategoryModal(false);
    }
  };

  const renderDeleteCategoryModal = () => {
    return (
      <NewModal
        show={deleteCategoryModal}
        handleHide={() => setDeleteCategoryModal(false)}
        modalTitle="Confirm Delete"
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("No");
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h4 className="text-center">Are You Sure</h4>
        <Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>
        {expandedArray.map((item, index) => (
          <div key={index}>
            {index + 1}. {item.name}
          </div>
        ))}
        <Row className="mt-3">
          <Col>
            <h6>Checked</h6>
          </Col>
        </Row>
        {checkedArray.map((item, index) => (
          <div key={index}>
            {index + 1}. {item.name}
          </div>
        ))}
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <Container fluid>
        {categories.loading && <h5 className="text-center">Loading...</h5>}
        {categories.categories.length === 0 && (
          <h4 className="text-center">There is no any categories!</h4>
        )}
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
              onClick={deleteCategory}
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

      {renderAddCategoryModal()}
      {renderUpdateCategoriesModal()}
      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
