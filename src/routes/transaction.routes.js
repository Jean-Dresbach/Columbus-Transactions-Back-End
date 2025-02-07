import express from "express"

import { TransactionController } from "../controllers/transaction.controller.js"

const router = express.Router()
const transactionController = new TransactionController()

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Criação de uma nova transação
 *     tags: [Transactions]
 *      parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
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
 *
 *     responses:
 *       201:
 *         description: Transação criada com sucesso.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post("/:userId", transactionController.store)

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Listar todas as transações
 *     tags: [Transactions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de Transações.
 *       500:
 *         description: Erro interno do servidor.
 */

router.get("/:userId", transactionController.index)

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Atualizar uma transação existente
 *     tags: [Transactions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da transação a ser atualizada
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
 *       404:
 *         description: Transação não encontrada.
 */

router.put("/:transactionId", transactionController.update)

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Excluir uma transação
 *     tags: [Transactions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da transação a ser excluída
 *     responses:
 *       200:
 *         description: Transação excluída com sucesso.
 *       404:
 *         description: Transação não encontrada.
 */

router.delete("/:transactionId", transactionController.delete)

export default router
