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
        const isUUID = /^[0-9a-fA-F-]{36}$/.test(identifier) // Verifica se o identifier é um UUID válido

        const user = await repository.user.findFirst({
            where: isUUID
                ? { id: identifier } // Busca por ID
                : { email: identifier }, // Busca por e-mail
            select: {
                id: true,
                name: true,
                email: true,
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

        await repository.user.update({
            where: { id },
            data,
        })

        return {
            code: 200,
            message: "Usuário atualizado com sucesso.",
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
