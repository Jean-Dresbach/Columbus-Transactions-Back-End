import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swaggerConfig.js"
import userRoutes from "./routes/user.routes.js"
// import transactionRoutes from "./routes/transactionRoutes.js"

// Carrega variáveis de ambiente do arquivo .env
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Definindo as rotas e a documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use("/users", userRoutes)
// app.use("/transactions", transactionRoutes)

app.listen(3000, () => console.log(`Server running on http://localhost:3000`))
