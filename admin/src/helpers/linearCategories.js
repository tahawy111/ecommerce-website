const linearCategories = (categories, options = []) => {
  for (let category of categories) {
    options.push({
      value: category._id,
      name: category.name,
      type: category.type,
      parentId: category.parentId,
    });
    if (category.children.length > 0) {
      linearCategories(category.children, options);
    }
  }
  return options;
};

export default linearCategories;
