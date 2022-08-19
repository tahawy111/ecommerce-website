import { useEffect, useState } from "react";
import Layout from "./../../components/Layout/index";
import NewModal from "./../../components/UI/Modal/index";
import { Button, Col, Row } from "react-bootstrap";
import Input from "./../../components/UI/Input/index";
import { useSelector } from "react-redux";
import linearCategories from "../../helpers/linearCategories";

const NewPage = () => {
  const [craeteModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  console.log(banners);
  const [products, setProducts] = useState([]);
  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };
  const handleProductImages = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);

  const submitPageForm = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append("title", title);
    form.append("title", title);

    setCreateModal(false);
  };

  const renderCreatePageModal = () => {
    return (
      <NewModal
        show={craeteModal}
        handleHide={() => setCreateModal(false)}
        modalTitle="Create New Page"
        handleClose={submitPageForm}
        submitTitle="Create"
      >
        <Row>
          <Col>
            <select
              className="form-control mb-3"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              label="Page Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page Title"
              className="mb-3"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Input
              label="Page Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
              className="mb-3"
            />
          </Col>
        </Row>

        {banners.length > 0
          ? banners.map((banner, index) => (
              <Row>
                <Col>{banner.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <Input
              type="file"
              label="Banners"
              name="banners"
              onChange={handleBannerImages}
            />
          </Col>
        </Row>
        {products.length > 0
          ? products.map((product, index) => (
              <Row>
                <Col>{product.name}</Col>
              </Row>
            ))
          : null}
        <Row>
          <Col>
            <Input
              type="file"
              label="Products"
              name="products"
              onChange={handleProductImages}
            />
          </Col>
        </Row>
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      {renderCreatePageModal()}

      <Button variant="primary" onClick={() => setCreateModal(true)}>
        Create Page
      </Button>
    </Layout>
  );
};

export default NewPage;
