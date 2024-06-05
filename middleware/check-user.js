module.exports = function (express, db) {
  return function (req, res, next) {
    let queryBuilder = {
      where: {
        email: { $eq: req.body.email },
      },
    };
    db.User.findOne(queryBuilder)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User doesn't find" });
        }

        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ message: "Error to find user" });
      });
  };
};
