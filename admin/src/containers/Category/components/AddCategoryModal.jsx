import React from "react";
import Input from "../../../components/UI/Input";
import NewModal from "../../../components/UI/Modal/index";

const AddCategoryModal = (props) => {
  const {
    modalTitle,
    submitTitle,
    show,
    handleHide,
    handleClose,
    createCategoryList,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    handleCategoryImage,
  } = props;
  return (
    <NewModal
      show={show}
      handleHide={handleHide}
      modalTitle={modalTitle}
      handleClose={handleClose}
      submitTitle={submitTitle}
    >
      <Input
        value={categoryName}
        placeholder={"Enter Category Name"}
        onChange={setCategoryName}
        label="Category Name"
      />

      <select
        className="form-control mb-2"
        value={parentCategoryId}
        onChange={setParentCategoryId}
      >
        <option defaultValue>Select Category</option>
        {createCategoryList.map((option) => (
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

export default AddCategoryModal;
