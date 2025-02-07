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

    async findByEmail(email) {
        const user = await repository.user.findUnique({
            where: { email },
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
}
