const express = require("express");
const { tryCatchWrapper } = require("../../helpers/helpers");
const {
  getListContacts,
  createContact,
  current,
  uploadAvatar,
  verifyEmail,
  resendVerifyEmail,
} = require("../../controllers/user/index");
const { auth } = require("../../middlewares/index");
const { upload } = require("../../middlewares/index");

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
userRouter.patch(
  "/avatars",
  upload.single("avatar"),
  tryCatchWrapper(uploadAvatar)
);
userRouter.get("/verify/:verificationToken", tryCatchWrapper(verifyEmail));
userRouter.post("/verify", tryCatchWrapper(resendVerifyEmail));

module.exports = { userRouter };
