module.exports = function (app, db) {
  return {
    students: async function (req, res) {
      console.log(req.body);
      try {
        let queryBuilder = {
          where: {
            groupId: { $eq: req.body.id },
          },
        };
        let students = await db.User.findAll(queryBuilder);
        return res.json(students);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },
    create: async function (req, res) {
      try {
        let user = req.user;
        let name = req.body.name;
        let queryBuilder = {
          where: {
            name: { $eq: name },
          },
        };
        let group = await db.Group.findOne(queryBuilder);

        if (!group) {
          group = await db.Group.create({ name });

          return res.json({ message: "Grupo creado" });
        }
        return res.status(400).json({ message: "El grupo ya existe" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },

    //Agregar usuario a un grupo
    add: async function (req, res) {
      try {
        let username = req.body.add;
        let queryBuilder = {
          where: {
            username: { $eq: username },
          },
        };
        let user = await db.User.findOne(queryBuilder);
        if (!user) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        } else {
          await user.update({
            groupId: req.body.id,
          });
          return res.json({ message: "Usuario agregado al grupo" });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },

    //editar informacion de usuario
    edit: async function (req, res) {
      try {
        let user = req.user;
        // rolId student = 3, techer = 2,admin = 1
        if (user.rolId == 3)
          return res.status(400).json({ message: "Permission denied" });
        let username = req.body.username;
        let name = req.body.name;
        let email = req.body.email;
        let number = req.body.number;
        await user.update({
          name,
          username,
          email,
          number,
        });
        return res.json({ message: "user has been edited" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },

    list: async function (req, res) {
      console.log(req.body);
      try {
        console.log(req.body);
        let json = [];
        let groups = await db.Group.findAll();
        for (var i = 0; i <= groups.length - 1; i++) {
          let students = await db.User.findAll({
            where: {
              groupId: { $eq: groups[i].id },
            },
          });
          let data = {
            id: groups[i].id,
            name: groups[i].name,
            students: students.length,
            points: groups[i].points,
          };
          json.push(data);
        }
        return res.json(json);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },

    //Eliminar grupo
    delete: async function (req, res) {
      try {
        let queryBuilder = {
          where: {
            id: { $eq: req.body.id },
          },
        };
        let group = await db.Group.findOne(queryBuilder);
        await group.destroy();
        return res.json({ message: "Grupo eliminado" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },

    //Borrar usuario de un grupo
    deleteStudent: async function (req, res) {
      try {
        console.log(req.body);

        let queryBuilder = {
          where: {
            id: { $eq: req.body.id },
          },
        };
        let user = await db.User.findOne(queryBuilder);
        await user.update({
          groupId: 0,
        });

        return res.json({ message: "Estudiante eliminado" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },
  };
};
