module.exports = function (app, db) {
  var checkAuth = require("../middleware/check-auth")(app, db);
  var checkRol = require("../middleware/check-rol")(app, db);

  return {
    students: [checkAuth],
    create: [checkAuth, checkRol],
    add: [checkAuth, checkRol],
    edit: [checkAuth, checkRol],
    list: [checkAuth],
    delete: [checkAuth, checkRol],
    deleteStudent: [checkAuth, checkRol],
  };
};
