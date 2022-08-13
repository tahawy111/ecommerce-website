import Layout from "./../../components/Layout/index";
import "./style.css";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import UpdateCategoryModal from "./components/UpdateCategoryModal";
import AddCategoryModal from "./components/AddCategoryModal";
import "./style.css";

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

    if (categoryName === "") {
      alert("Name is Required");
      return;
    }
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

  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    // const expandedIdsArray = expandedArray.map((item, index) => ({
    //   _id: item.value,
    // }));

    // const idsArray = expandedIdsArray.concat(checkedIdsArray);

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
            onClick: () => setDeleteCategoryModal(false),
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

              <div style={{ display: "flex" }}>
                <Button
                  variant="danger"
                  className="mt-3"
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
                  className="mt-3"
                  onClick={updateCategory}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    marginRight: "1rem",
                    color: "white",
                  }}
                >
                  <GoPencil />
                </Button>
                <Button
                  variant="success"
                  className="mt-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    marginRight: "1rem",
                  }}
                  onClick={handleShow}
                >
                  <BsPlusLg />
                </Button>
              </div>
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
          <Col className="mt-3 d-flex"></Col>
        </Row>
      </Container>

      <AddCategoryModal
        modalTitle="Add New Category"
        submitTitle="Add New Category"
        show={show}
        handleHide={() => setShow(false)}
        handleClose={handleClose}
        createCategoryList={createCategoryList(categories.categories)}
        categoryName={categoryName}
        setCategoryName={(e) => setCategoryName(e.target.value)}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={(e) => setParentCategoryId(e.target.value)}
        handleCategoryImage={handleCategoryImage}
      />
      <UpdateCategoryModal
        size="lg"
        modalTitle="Update Category"
        submitTitle="Update"
        show={updateCategoryModal}
        handleHide={() => setUpdateCategoryModal(false)}
        createCategoryList={createCategoryList(categories.categories)}
        handleClose={updateCategoriesForm}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handleCategoryInput={handleCategoryInput}
      />
      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
