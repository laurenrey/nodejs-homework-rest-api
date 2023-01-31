const { User } = require("../../models/user");

const createContact = async (req, res, next) => {
  const { user } = req;
  const { id: contactId } = req.body;

  user.contacts.push({ _id: contactId });
  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
  }).select({
    contacts: 1,
    _id: 0,
  });

  return res.status(201).json({
    data: {
      contacts: updatedUser.contacts,
    },
  });
};

module.exports = createContact;
