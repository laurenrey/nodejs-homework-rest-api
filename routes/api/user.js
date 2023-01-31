const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const {
  getListContacts,
  createContact,
  current,
} = require("../../controllers/user/index");
const { auth } = require("../../middlewares");

const userRouter = express.Router();

userRouter.post(
  "/contacts",
  tryCatchWrapper(auth),
  tryCatchWrapper(createContact)
);
userRouter.get(
  "/contacts",
  tryCatchWrapper(auth),
  tryCatchWrapper(getListContacts)
);
userRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(current));

module.exports = { userRouter };
