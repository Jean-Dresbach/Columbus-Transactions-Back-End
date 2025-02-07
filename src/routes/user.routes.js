import express from "express"

import { UserController } from "../controllers/user.controller"

const router = express.Router()

const userController = new UserController()

router.post("/users/create", userController.signup)

router.get("/users/login", userController.login)

export default router
