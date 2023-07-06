const Users = require("../../api/v1/users/model");
const { BadRequestError, UnAuthorizedError } = require("../../errors");
const { createJWT, createTokenUser } = require("../../utils");

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide Email and Password")
  }
  const result = await Users.findOne({ email });

  if (!result) {
    throw new UnAuthorizedError("Invalid Credentials");
  }
  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthorizedError("Invalid Credentials");
  }
  const token = createJWT({ payload: createTokenUser(result) })
  return token;
}

module.exports = { signin }
