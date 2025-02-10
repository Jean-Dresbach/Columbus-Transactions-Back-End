import { TransactionService } from "../services/transaction.service.js"

const transactionService = new TransactionService()

export class TransactionController {
    async index(request, response) {
        try {
            const { userId } = request

            const result = await transactionService.findAll(userId)

            return response.status(result.code).json(result)
        } catch (error) {
            console.log(error)

            return response.status(500).json({
                message: "Erro interno do servidor.",
            })
        }
    }

    async store(request, response) {
        try {
            const { userId } = request
            const { value, type, method, category } = request.body

            const result = await transactionService.create({
                value,
                type,
                method,
                category,
                userId,
            })

            return response.status(result.code).json(result)
        } catch (error) {
            console.log(error)

            return response.status(500).json({
                message: "Erro interno do servidor.",
            })
        }
    }

    async update(request, response) {
        try {
            const { transactionId } = request.params
            const { value, type, method, category } = request.body

            const result = await transactionService.update({
                id: transactionId,
                value,
                type,
                method,
                category,
            })

            return response.status(result.code).json(result)
        } catch (error) {
            console.log(error)

            return response.status(500).json({
                message: "Erro interno do servidor.",
            })
        }
    }

    async delete(request, response) {
        try {
            const { transactionId } = request.params

            const result = await transactionService.delete(transactionId)

            return response.status(result.code).json(result)
        } catch (error) {
            console.log(error)

            return response.status(500).json({
                message: "Erro interno do servidor.",
            })
        }
    }
}
