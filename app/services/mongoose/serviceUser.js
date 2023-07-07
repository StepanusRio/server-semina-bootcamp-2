const User = require("../../api/v1/users/model");
const Organizer = require("../../api/v1/organizers/model");
const { BadRequestError } = require("../../errors")

const createOrganizer = async (req) => {
  const { organizer, email, password, confirmPassword, role, name } = req.body
  if (password !== confirmPassword) {
    throw new BadRequestError("Password and Confirm Password Not Match")
  }

  const result = await Organizer.create({ organizer });

  const users = await User.create({
    email,
    name,
    password,
    role,
    organizer: result._id
  })
  delete users._doc.password;

  return users;
}

const createUser = async (req) => {
  const { name, password, confirmPassword, role, email } = req.body;
  if (password !== confirmPassword) {
    throw new BadRequestError("Password and Confirm Password Not Match")
  }
  const result = await User.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role
  })

  return result
}

const getAllUsers = async (req) => {
  const result = await User.find();
  return result
}

module.exports = {
  createOrganizer,
  createUser,
  getAllUsers
}
