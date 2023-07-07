const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");
// Get ALl Category Services
const getAllCategories = async (req) => {
  const result = await Categories.find({ organizer: req.user.organizer });
  return result;
};

// Create Category Services
const createCategories = async (req) => {
  const { name } = req.body;
  // Check if Category Name has ben registered
  const check = await Categories.findOne({ name, organizer: req.user.organizer });
  if (check) throw new BadRequestError("Category Name Duplicated");
  // Retrun If Available
  const result = await Categories.create({ name, organizer: req.user.organizer });
  return result;
}

// Get One Category Services
const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({ _id: id, organizer: req.user.organizer });
  if (!result) throw new NotFoundError(`Categories name with id: ${id} not found!!`)
  return result;
}

// Update Category services
const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  const check = await Categories.findOne(
    {
      name,
      organizer: req.user.organizer,
      // $ne will search all data in category except this ID
      _id: { $ne: id }
    });
  if (check) throw new BadRequestError("Category Name Duplicated");
  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );
  if (!result) throw new NotFoundError(`Categories name with id: ${id} not found!!`)
  return result;
}

// Delete Category services
const deleteCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne(
    { _id: id, organizer: req.user.organizer }
  );
  if (!result) throw new NotFoundError(`Categories name with id: ${id} not found!!`)
  await Categories.findOneAndRemove({ _id: id });
  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Categories name with id :  ${id} not found!!`);

  return result;
};


module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories
};
