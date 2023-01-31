const { User } = require("../../models/user");

const getListContacts = async (req, res, next) => {
  const { user } = req;

  const userWithContacts = await User.findById(user._id).populate(
    "contacts",

    {
      phone: 1,
      name: 1,
      email: 1,
    }
  );
  return res.status(200).json({
    data: {
      contacts: userWithContacts.contacts,
    },
  });
};

module.exports = getListContacts;
