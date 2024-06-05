module.exports = function (express, db) {
  return function (req, res, next) {
    let token = req.headers.authorization.split(" ")[1];
    let queryBuilder = {
      where: {
        token: { $eq: token },
      },
    };
    db.User.findOne(queryBuilder).then((user) => {
      if (user.rolId == 1) {
        return res.status(404).json({ message: "Not authorized" });
      }
      req.user = user;
      next();
    });
  };
};
