import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { UserService } from "../services/user.service.js"

const userService = new UserService()

export class UserController {
    async store(request, response) {
        try {
            const { name, email, password } = request.body

            const hashedPassword = await bcrypt.hash(password, 10)

            const result = await userService.create({
                name,
                email,
                password: hashedPassword,
            })

            return response.status(result.code).json(result)
        } catch (error) {
            console.log(error)

            return response.status(500).json({
                message: "Erro interno do servidor.",
            })
        }
    }

    async login(request, response) {
        try {
            const { email, password, stayLoggedIn } = request.body

            const result = await userService.findUser(email)

            if (result.code !== 200) {
                return response
                    .status(401)
                    .json({ code: 401, message: "Credenciais inválidas." })
            }

            const user = result.data

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            )

            if (!isPasswordValid) {
                return response
                    .status(401)
                    .json({ code: 401, message: "Credenciais inválidas." })
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: stayLoggedIn ? "7d" : process.env.JWT_EXPIRATION,
            })

            delete result.data.password

            return response.json({ token, ...result })
        } catch (error) {
            console.log(error)

            return response.status(500).json({
                code: 500,
                message: `Erro interno do servidor.`,
            })
        }
    }

    async update(request, response) {
        try {
            const { userId } = request
            const { name, email } = request.body

            const data = {
                name,
                email,
            }

            const result = await userService.update(userId, data)

            return response.status(result.code).json(result)
        } catch (error) {
            console.log(error)

            return response.status(500).json({
                message: "Erro interno do servidor.",
            })
        }
    }

    async updatePassword(request, response) {
        try {
            const { userId } = request
            const { oldPassword, newPassword } = request.body

            const result = await userService.findUser(userId)
            if (result.code !== 200) {
                return response.status(result.code).json(result)
            }

            const user = result.data

            const isPasswordValid = await bcrypt.compare(
                oldPassword,
                user.password
            )
            if (!isPasswordValid) {
                return response
                    .status(401)
                    .json({ code: 401, message: "Senha atual incorreta." })
            }

            if (oldPassword === newPassword) {
                return response
                    .status(400)
                    .json({
                        code: 400,
                        message:
                            "A nova senha não pode ser igual à senha atual.",
                    })
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10)

            const updateResult = await userService.update(userId, {
                password: hashedNewPassword,
            })

            updateResult.message = "Senha atulizada com sucesso."

            return response.status(updateResult.code).json(updateResult)
        } catch (error) {
            console.log(error)
            return response.status(500).json({
                message: "Erro interno do servidor.",
            })
        }
    }

    async delete(request, response) {
        try {
            const { userId } = request

            const result = await userService.delete(userId)

            return response.status(result.code).json(result)
        } catch (error) {
            console.log(error)

            return response.status(500).json({
                message: "Erro interno do servidor.",
            })
        }
    }
}
