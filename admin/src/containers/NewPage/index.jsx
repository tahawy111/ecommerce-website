import { useEffect, useState } from "react";
import Layout from "./../../components/Layout/index";
import NewModal from "./../../components/UI/Modal/index";
import { Button, Col, Row } from "react-bootstrap";
import Input from "./../../components/UI/Input/index";
import { useDispatch, useSelector } from "react-redux";
import linearCategories from "../../helpers/linearCategories";
import { createPage } from "../../actions/page.action";
import { toast } from "react-toastify";

const NewPage = () => {
  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();
  // useStates
  const [craeteModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
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
  useEffect(() => {
    if (!page.loading) {
      setCreateModal("");
      setTitle("");
      setCategoryId("");
      setDesc("");
      setType("");
      setBanners([]);
      setProducts([]);
    }
  }, []);

  const submitPageForm = (e) => {
    e.preventDefault();

    const form = new FormData();

    if (title === "") {
      toast.warning("Title is Required");
      return;
    } else {
      form.append("title", title);
    }
    if (desc !== "") {
      form.append("description", desc);
    }

    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((product, index) => {
      form.append("products", product);
    });

    dispatch(createPage(form)).then(() => {
      toast.success("Page Created Sucessfully");
    });
    setCreateModal(false);
  };

  const onCategoryChange = (e) => {
    const categoryf = categories.find(
      (category) => category.value === e.target.value
    );

    setCategoryId(e.target.value);
    setType(categoryf.type);
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
            {/* Select */}
            <Input
              value={categoryId}
              onChange={onCategoryChange}
              label="Select Category"
              options={categories}
              type="select"
            />
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
              <Row key={index}>
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
              <Row key={index}>
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
