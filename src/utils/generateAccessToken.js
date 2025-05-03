import jwt from "jsonwebtoken";
const generateAccessToken = ({ _id, email }) => {
  return jwt.sign(
    {
      _id,
      email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

export default generateAccessToken;
