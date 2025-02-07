import jwt from "jsonwebtoken"

export async function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id // Adiciona o userId à requisição
        next()
    } catch (err) {
        return res.status(403).json({ message: "Token inválido." })
    }
}
