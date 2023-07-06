const Image = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

const createImages = async (req) => {
  const result = await Image.create({
    name: req.file ? `uploads/${req.file.filename}` : `uploads/avatar/default.jpeg`
  })
  return result
}

const generateUrlImage = async (req) => {
  const result = `uploads/${req.file.filename}`;
  return result
}

const checkingImages = async (id) => {
  const result = await Image.findOne({ _id: id });
  if (!result) throw new NotFoundError(`Id Not Found for Image`);
  return result;
}

module.exports = { createImages, generateUrlImage, checkingImages };
