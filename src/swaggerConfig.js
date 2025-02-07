import swaggerJsdoc from "swagger-jsdoc"

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ bearerAuth: [] }],
        info: {
            title: "API de Transações",
            version: "1.0.0",
            description: "Documentação da API de transações",
        },
    },
    apis: ["./src/routes/*.js"], // Atualize o caminho conforme necessário
}

const swaggerDocs = swaggerJsdoc(options)

export default swaggerDocs
