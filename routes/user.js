const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
  deleteUser,
  createNewUser
} = require("../controllers/user");

const router = express.Router();

router.get("/newUser", createNewUser);

router.get("/delete/:id", deleteUser);

router.route("/user").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/user/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
