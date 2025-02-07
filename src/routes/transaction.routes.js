import express from "express"

import { TransactionController } from "../controllers/transaction.controller.js"
import { authenticateToken } from "../middlewares/auth.middleware.js"

const router = express.Router()
const transactionController = new TransactionController()

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Criação de uma nova transação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *                 example: 150.00
 *               type:
 *                 type: string
 *                 enum: [entrada, saída]
 *                 example: entrada
 *               method:
 *                 type: string
 *                 example: transferência bancária
 *               category:
 *                 type: string
 *                 example: compras
 *     responses:
 *       201:
 *         description: Transação criada com sucesso.
 *       401:
 *         description: Token inválido ou ausente.
 *       500:
 *         description: Erro interno do servidor.
 */

router.post("/", authenticateToken, transactionController.store)

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Listar todas as transações do usuário autenticado
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de Transações.
 *       401:
 *         description: Token inválido ou ausente.
 *       500:
 *         description: Erro interno do servidor.
 */

router.get("/", authenticateToken, transactionController.index)

/**
 * @swagger
 * /transactions/{transactionId}:
 *   put:
 *     summary: Atualizar uma transação existente
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: transactionId
 *         in: path
 *         required: true
 *         description: ID da transação a ser atualizada
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *                 example: 100.00
 *               type:
 *                 type: string
 *                 enum: [entrada, saída]
 *                 example: saída
 *               method:
 *                 type: string
 *                 example: crédito
 *               category:
 *                 type: string
 *                 example: alimentação
 *     responses:
 *       200:
 *         description: Transação atualizada com sucesso.
 *       401:
 *         description: Token inválido ou ausente.
 *       404:
 *         description: Transação não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */

router.put("/:transactionId", authenticateToken, transactionController.update)

/**
 * @swagger
 * /transactions/{transactionId}:
 *   delete:
 *     summary: Excluir uma transação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: transactionId
 *         in: path
 *         required: true
 *         description: ID da transação a ser excluída
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transação excluída com sucesso.
 *       401:
 *         description: Token inválido ou ausente.
 *       404:
 *         description: Transação não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */

router.delete(
    "/:transactionId",
    authenticateToken,
    transactionController.delete
)

export default router
