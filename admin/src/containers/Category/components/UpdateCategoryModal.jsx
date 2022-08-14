import Input from "../../../components/UI/Input/index";
import NewModal from "../../../components/UI/Modal";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

const UpdateCategoryModal = (props) => {
  const {
    size,
    modalTitle,
    submitTitle,
    show,
    handleHide,
    handleClose,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    createCategoryList,
  } = props;
  return (
    <NewModal
      show={show}
      handleHide={handleHide}
      modalTitle={modalTitle}
      handleClose={handleClose}
      submitTitle={submitTitle}
      size={size}
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
                  handleCategoryInput("name", e.target.value, index, "expanded")
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
                {createCategoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "expanded")
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
            {console.log(item)}
            <Col>
              <Input
                value={item.name}
                placeholder={"Enter Category Name"}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
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
                {createCategoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handleCategoryInput("type", e.target.value, index, "checked")
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

export default UpdateCategoryModal;
