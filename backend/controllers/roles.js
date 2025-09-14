const roleModel = require("../models/rolesSchema");

const createRole = (req, res) => {
  const { roleName, permissions } = req.body;
  const newRole = new roleModel({
    roleName,
    permissions,
  });
  newRole
    .save()
    .then((Role) => {
      res.status(201).json({
        success: true,
        message: "Role Created Successfully",
        roleIngo: Role,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Somthing Went Wrong",
        error: err,
      });
    });
};

module.exports = { createRole };
