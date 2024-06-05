module.exports = function (app, db) {
  return {
    //students in a group
    students: async function (req, res) {
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

          return res.json({ message: "Group created" });
        }
        return res.status(400).json({ message: "Group already exists" });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },

    //Add user to a group
    add: async function (req, res) {
      try {
        let email = req.body.email;
        let queryBuilder = {
          where: {
            email: { $eq: email },
          },
        };
        let user = await db.User.findOne(queryBuilder);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        } else {
          await user.update({
            groupId: req.body.id,
          });
          return res.json({ message: "User added to group" });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },

    //Edit group information
    edit: async function (req, res) {
      try {

        let name = req.body.name;
        let queryBuilder = {
          where: {
            id: { $eq: req.body.id },
          },
        };
        let group = await db.Group.findOne(queryBuilder);
        if(!group){
          return res.status(404).json({message: "Group doesn't find"});
        }else{
          await group.update({
            name,
          });
          return res.json({ message: "Group has been edited" });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },

    //List groups
    list: async function (req, res) {
      console.log(req.body);
      try {
        let json = [];
        let groups = await db.Group.findAll();
        for (let i = 0; i <= groups.length - 1; i++) {
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
        if(!group){
          return res.status(404).json({message: "Group doesn't find"});
        }else{
          await group.destroy();
          return res.json({ message: "Group deleted" });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },

    //Borrar usuario de un grupo
    deleteStudent: async function (req, res) {
      try {
        let queryBuilder = {
          where: {
            id: { $eq: req.body.id },
          },
        };
        let user = await db.User.findOne(queryBuilder);

        if(!user){
          res.status(404).json({message: "User doesn't find"})
        } else{
          await user.update({
            groupId: null,
          });
          return res.json({ message: "Student deleted from group" });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong" });
      }
    },
  };
};
