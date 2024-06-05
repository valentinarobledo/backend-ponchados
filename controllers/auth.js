const bcrypt = require("bcrypt");

module.exports = (app, db) => {
  return {
    login: async function (req, res) {
      try {
        let user = req.user;

        let bool = await bcrypt.compare(req.body.password, user.password);
        console.log(user.password);

        if (!bool) {
          return res.status(404).json({ message: "Invalid password" });
        }

        return res.json({
          user: {
            name: user.name,
            email: user.email,
            token: user.token,
            rolId: user.rolId,
          },
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Something went wrong" });
      }
    },

    register: async function (req, res) {
      try {
        let email = req.body.email;
        let queryBuilder = {
          where: {
            email:email,
          },
        };

        let user = await db.User.findOne(queryBuilder);

        if (!user) {
          let email = req.body.email;
          let name = req.body.name;
          let number = req.body.number;
          let password = req.body.password;
          let verifyPassword = req.body.verifyPassword;

          if (password != verifyPassword) {
            return res
              .status(400)
              .json({ message: "Passwords do not match" });
          }
          password = await bcrypt.hash(req.body.password, 10);

          let data = {
            email,
            token: new Buffer.from(password).toString("Base64"),
            name,
            number,
            password,
            rolId: 1, //Rol de estudiante
          };

          user = await db.User.create(data);

          return res.json({ message: "User created" });
        } else {
          return res.status(400).json({ message: "User already exists" });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },
  };
};
