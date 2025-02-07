import swaggerJsdoc from "swagger-jsdoc"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Transações",
            version: "1.0.0",
            description: "API para gerenciar usuários e transações.",
        },
    },
    apis: ["./src/routes/*.js"],
}

const swaggerDocs = swaggerJsdoc(options)

export default swaggerDocs
