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

    async updatePassword(request, response) {
        try {
            const { userId } = request // ID do usuário autenticado (via token JWT, por exemplo)
            const { oldPassword, newPassword } = request.body

            // 1. Buscar o usuário pelo ID
            const result = await userService.findUser(userId)
            if (result.code !== 200) {
                return response.status(result.code).json(result)
            }

            const user = result.data

            // 2. Validar a senha antiga
            const isPasswordValid = await bcrypt.compare(
                oldPassword,
                user.password
            )
            if (!isPasswordValid) {
                return response
                    .status(401)
                    .json({ code: 401, message: "Senha antiga incorreta." })
            }

            // 3. Hashear a nova senha
            const hashedNewPassword = await bcrypt.hash(newPassword, 10)

            // 4. Atualizar a senha no banco de dados
            const updateResult = await userService.update(userId, {
                password: hashedNewPassword,
            })

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
