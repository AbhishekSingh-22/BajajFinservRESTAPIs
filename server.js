require('dotenv').config();
const express = require("express");
const cors = require("cors");
const helperFunctions = require("./utils/helperFunctions");
const bfhlRoutes = require("./routes/bfhl.route.js")


// usins swagger for interactive api documentation
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.text({ limit: '10mb' })); // For raw text input

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VIT BFHL API",
      version: "1.0.0",
      description: "REST API for VIT Full Stack Assignment",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://your-domain.vercel.app"
            : `http://localhost:${PORT}`,
        description: "API Server",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs",  (req, res, next) => {
  swaggerSpec.servers = [
    {
      url: `${req.protocol}://${req.get('host')}`,
    },
  ];
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Main POST route
app.use("/bfhl", bfhlRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  try {
    res.json({
      message: "BFHL API is running!",
      documentation: "/api-docs",
      endpoint: "/bfhl",
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error",
      errorMessage: error.message
    });
  }
});


// calling and listening to server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `API Documentation available at http://localhost:${PORT}/api-docs`
  );
  console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});
