import { repository } from "../database/prisma.connection.js"

export class UserService {
    async create({ email, name, password }) {
        const existingUser = await repository.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return {
                code: 409,
                message: "E-mail já cadastrado.",
            }
        }

        await repository.user.create({
            data: {
                name,
                email,
                password,
            },
        })

        return {
            code: 201,
            message: "Usuário criado com sucesso.",
        }
    }

    async findUser(identifier) {
        const isUUID = /^[0-9a-fA-F-]{36}$/.test(identifier)

        const user = await repository.user.findFirst({
            where: isUUID ? { id: identifier } : { email: identifier },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        })

        if (!user) {
            return {
                code: 404,
                message: "Usuário não encontrado.",
            }
        }

        return {
            code: 200,
            message: "Usuário encontrado com sucesso.",
            data: user,
        }
    }

    async update(id, data) {
        const existingUser = await repository.user.findUnique({
            where: { id },
        })

        if (!existingUser) {
            return {
                code: 404,
                message: "Usuário não encontrado.",
            }
        }

        if (data.email && data.email !== existingUser.email) {
            const emailAlreadyRegistered = await repository.user.findUnique({
                where: { email: data.email },
            })

            if (emailAlreadyRegistered) {
                return {
                    code: 409,
                    message: "E-mail já registrado!",
                }
            }
        }

        const updatedUser = await repository.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
            },
        })

        return {
            code: 200,
            message: "Usuário atualizado com sucesso.",
            data: updatedUser,
        }
    }

    async delete(id) {
        const existingUser = await repository.user.findUnique({
            where: { id },
        })

        if (!existingUser) {
            return {
                code: 404,
                message: "Usuário não encontrado.",
            }
        }

        await repository.user.delete({
            where: { id },
        })

        return {
            code: 200,
            message: "Usuário deletado com sucesso.",
        }
    }
}
