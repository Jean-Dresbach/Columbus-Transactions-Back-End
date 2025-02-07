import { repository } from "../database/prisma.connection"

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

        return {
            code: 200,
            message: "Usuário encontrado com sucesso.",
            data: user,
        }
    }

    //   async update({ userId, email, name, password }) {
    //     await repository.user.update({
    //       where: {
    //         id: userId,
    //       },
    //       data: {
    //         name,
    //         email,
    //         password,
    //       },
    //     });

    //     return {
    //       code: 200,
    //       message: "Usuário atualizado com sucesso.",
    //     };
    //   }

    //   // Método para excluir um usuário
    //   async delete(id) {
    //     await repository.user.delete({
    //       where: { id },
    //     });

    //     return {
    //       code: 200,
    //       message: "Usuário removido com sucesso.",
    //     };
    //   }
}
