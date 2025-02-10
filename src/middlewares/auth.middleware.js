import jwt from "jsonwebtoken"

export async function authenticateToken(request, response, next) {
    try {
        const authHeader = request.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]

        if (!token) {
            return response
                .status(401)
                .json({ message: "Token não fornecido." })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        request.userId = decoded.id

        next()
    } catch (err) {
        return response.status(403).json({ message: "Token inválido." })
    }
}
