import express from "express"
import { adminOnly, verifyToken } from "../utils/verifyUser.js"
import { deleteUser, getUserById, getUsers } from "../controller/user.controller.js"

const router = express.Router()

// User mangement route
router.get("/get-users", verifyToken, adminOnly, getUsers)

router.get("/:id", verifyToken, getUserById)
router.delete("/:id", verifyToken, adminOnly, deleteUser);

export default router
