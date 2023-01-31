const express = require("express");

const { register, login, logout } = require("../../controllers/auth/index");
const { tryCatchWrapper } = require("../../helpers/helpers");
const { authSchema } = require("../../validation/schema");
const { auth } = require("../../middlewares/index");
const { validateBody } = require("../../validation/validation");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authSchema),
  tryCatchWrapper(register)
);

authRouter.post("/login", tryCatchWrapper(login));
authRouter.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(logout));

module.exports = { authRouter };
