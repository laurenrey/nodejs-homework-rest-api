const { HttpError } = require("http-errors");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const multer = require("multer");
const path = require("path");

const { JWT_SECRET } = process.env;

async function auth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    throw Unauthorized("Not authorized");
  }

  if (!token) {
    throw Unauthorized("Not authorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    console.log("user", user);

    req.user = user;
  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      throw HttpError(401, "jwt token is not valid");
    }
    throw error;
  }
  next();
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../tmp"));
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
  limits: {
    fileSize: 1048576,
  },
});

const upload = multer({
  storage,
});

module.exports = { auth, upload };
