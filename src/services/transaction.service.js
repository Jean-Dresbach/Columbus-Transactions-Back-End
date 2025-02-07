import { repository } from "../database/prisma.connection.js"

export class TransactionService {
    async findAll(userId) {
        const transactions = await repository.transaction.findMany({
            where: { userId },
            select: {
                id: true,
                title: true,
                description: true,
                status: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        })

        return {
            code: 200,
            message: "Transações do usuário listadas com sucesso.",
            data: transactions,
        }
    }

    async create({ value, type, method, category, userId }) {
        await repository.transaction.create({
            data: {
                value,
                type,
                method,
                userId,
            },
        })

        return {
            code: 201,
            message: "Transação criada com sucesso.",
        }
    }

    async update({ id, value, type, method, category }) {
        const transaction = await repository.transaction.findUnique({
            where: { id },
        })

        if (!transaction) {
            return {
                code: 404,
                message: "Transação não encontrada.",
            }
        }

        await repository.transaction.update({
            where: { id },
            data: {
                value,
                type,
                method,
                category,
            },
        })

        return {
            code: 200,
            message: "Transação atualizada com sucesso.",
        }
    }

    async delete(id) {
        const transaction = await repository.transaction.findUnique({
            where: { id },
        })

        if (!transaction) {
            return {
                code: 404,
                message: "Transação não encontrada.",
            }
        }

        await repository.transaction.delete({
            where: { id },
        })

        return {
            code: 200,
            message: "Transação removida com sucesso.",
        }
    }
}
