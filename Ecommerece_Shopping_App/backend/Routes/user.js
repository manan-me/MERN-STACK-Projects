const express = require("express");
const router = express.Router();
const { isAuthenticated, restrictTo } = require("../Middleware/auth");
const {
  handleCreateUser,
  handleLoginUser,
  handleLogoutUser,
  handleForgotPassword,
  handleResetPassword,
  handleGetUserDetails,
  handleUpdateUserPassword,
  handleUpdateUserProfile,
  handleGetAllUsers,
  handleGetAnyUserDeetails,
  handleUpdateUserRole,
  handleDeleteUser,
} = require("../Controllers/userController");

router.post("/register", handleCreateUser);
router.post("/login", handleLoginUser);
router.get("/logout", handleLogoutUser);
router.post("/password/forgot", handleForgotPassword);
router.put("/password/reset/:token", handleResetPassword);
router.get("/me", isAuthenticated, handleGetUserDetails);
router.put("/password/update", isAuthenticated, handleUpdateUserPassword);
router.get("/me/update", isAuthenticated, handleUpdateUserProfile);
router.get(
  "/admin/users",
  isAuthenticated,
  restrictTo(["ADMIN"]),
  handleGetAllUsers,
);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, restrictTo(["ADMIN"]), handleGetAnyUserDeetails)
  .put(isAuthenticated, restrictTo(["ADMIN"]), handleUpdateUserRole)
  .delete(isAuthenticated, restrictTo(["ADMIN"]), handleDeleteUser);

module.exports = router;
