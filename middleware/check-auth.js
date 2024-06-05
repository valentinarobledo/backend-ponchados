module.exports = function (express, db) {

return function (req, res, next) {
    console.log(req.headers);
    if (!req.headers.authorization)
    return res.status(400).json({ message: "Token required" });
    let token = req.headers.authorization.split(" ")[1];
    let queryBuilder = {
    where: {
        token: { $eq: token },
    },
    };
    db.User.findOne(queryBuilder)
    .then((user) => {
        if (!user) return res.status(401).json({ message: "Not authorized" });
        req.user = user;
        next();
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    });
};
};
