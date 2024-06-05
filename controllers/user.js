module.exports = function (express, db) {
  return {
    getAll: async function (req, res) {
      try {
        let queryBuilder = {
          include: [
            {
              model: db.Group,
              required: true,
            },
          ],
          where: {
            rolId: { $eq: 1 }, // de estudiante
          },
        };
        let students = await db.User.findAll(queryBuilder);

        return res.json(students);
      } catch (err) {}
    },

      //editar informacion de usuario
      edit: async function (req, res) {
        try {
          let user = req.user;
          // rolId student = 1, techer = 3,admin = 2
          if (user.rolId == 1)
            return res.status(400).json({ message: "Permission denied" });
          let name = req.body.name;
          let email = req.body.email;
          let number = req.body.number;
          await user.update({
            name,
            username,
            email,
            number,
          });
          return res.json({ message: "User has been edited" });
        } catch (err) {
          console.log(err);
          return res.status(400).json({ message: "Something went wrong" });
        }
      },
  };
};
