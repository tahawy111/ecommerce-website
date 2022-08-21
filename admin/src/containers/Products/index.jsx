import Layout from "./../../components/Layout/index";
import "./style.css";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import Input from "./../../components/UI/Input/index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/product.actions";
import NewModal from "../../components/UI/Modal";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import { toast } from "react-toastify";

const Products = () => {
  const [show, setShow] = useState(false);
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  const products = useSelector((state) => state.product);
  const [name, setName] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const categories = useSelector((state) => state.category);
  const [productDetails, setProductDetails] = useState(null);
  const handleProductPictures = (e) => {
    if (e.target.files[0] !== undefined) {
      setProductPictures([...productPictures, e.target.files[0]]);
    } else {
      alert("Can't add nothing");
    }
  };
  const handleClose = async () => {
    console.log(productPictures);
    if (name === "") {
      toast.error("Product Name Is Required");
      return;
    }
    if (quantity === "") {
      toast.error("Quantity Is Required");
      return;
    }
    if (price === "") {
      toast.error("Price Is Required");
      return;
    }
    if (categoryId === "") {
      toast.error("Category Is Required");
      return;
    }

    if (productPictures.length === 0) {
      toast.error("Product Pictures Is Required");
      return;
    }

    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    form.append("quantity", quantity);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form)).then(() => {
      setProductPictures([]);
      toast.success("Product Created Successfully");
    });

    setShow(false);
  };
  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 14 }} responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.products.length > 0 ? (
            products.products.map((product, index) => (
              <tr
                onClick={() => showProductDeatilsModal(product)}
                key={product._id}
              >
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.description}</td>
                <td>{product.category.name}</td>
              </tr>
            ))
          ) : (
            <h5 className="text-center">No Products!</h5>
          )}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <NewModal
        show={show}
        handleHide={() => setShow(false)}
        modalTitle="Add New Product"
        handleClose={handleClose}
        submitTitle="Add New Product"
      >
        <Input
          value={name}
          placeholder={"Enter Product Name"}
          onChange={(e) => setName(e.target.value)}
          label="Product Name"
        />
        <Input
          value={quantity}
          placeholder={"Enter Quantity"}
          onChange={(e) => setQuantity(e.target.value)}
          type="Number"
          label="Quantity"
        />
        <Input
          value={price}
          placeholder={"Enter Price"}
          onChange={(e) => setPrice(e.target.value)}
          type="Number"
          label="Price"
        />
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <select
          className="form-control mb-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option defaultValue>Select Category</option>
          {createCategoryList(categories.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <Input
          placeholder={"Choose Product Picture"}
          onChange={handleProductPictures}
          type="file"
          label="Product Picture"
          name="productPicture"
        />
        {productPictures.length > 0
          ? productPictures.map(
              (pic, index) =>
                pic !== undefined && <div key={index}>{pic.name}</div>
            )
          : null}
        {productPictures.length > 0 && (
          <Button
            className="mt-2 btn-sm"
            variant="danger"
            onClick={() => setProductPictures([])}
          >
            Remove all images added
          </Button>
        )}
      </NewModal>
    );
  };

  const handleCloseProductDeailsModal = () => {
    setProductDetailsModal(false);
  };

  const showProductDeatilsModal = (product) => {
    setProductDetails(product);
    setProductDetailsModal(true);
  };

  const renderProductDeailsModal = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <NewModal
        show={productDetailsModal}
        handleHide={() => setProductDetailsModal(false)}
        modalTitle="Product Details"
        handleClose={handleCloseProductDeailsModal}
        size="lg"
      >
        <Row>
          <Col md={6}>
            <label className="key">Name:</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md={6}>
            <label className="key">Price:</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <label className="key">Quantity:</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md={6}>
            <label className="key">Category:</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="key">Description:</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="key">Product Pictures:</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture) => (
                <div className="productImgContainer" key={picture._id}>
                  <img src={generatePublicUrl(picture.img)} alt="" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <>
        <Row>
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <h3>Products</h3>

              <Button variant="primary" className="mt-3" onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>{renderProducts()}</Col>
        </Row>

        {renderAddProductModal()}
        {renderProductDeailsModal()}
      </>
    </Layout>
  );
};

export default Products;
