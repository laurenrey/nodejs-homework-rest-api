const current = async (req, res, next) => {
  const { email, subscription } = req.user;
  return res.status(200).json({
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = current;
