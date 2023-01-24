const express = require("express");

const { tryCatchWrapper } = require("../../helpers/helpers");
const {
  getListContacts,
  getContact,
  createContact,
  deleteContact,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/controllers");
const { validateBody } = require("../../validation/validation");
const { contactSchema, statusSchema } = require("../../validation/schema");

const router = express.Router();

router.get("/", tryCatchWrapper(getListContacts));
router.get("/:id", tryCatchWrapper(getContact));
router.post("/", validateBody(contactSchema), tryCatchWrapper(createContact));
router.delete("/:id", tryCatchWrapper(deleteContact));
router.put(
  "/:contactId",
  validateBody(contactSchema),
  tryCatchWrapper(updateContactById)
);
router.patch(
  "/:contactId/favorite",
  validateBody(statusSchema),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;
