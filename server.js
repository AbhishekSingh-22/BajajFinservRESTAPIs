const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VIT BFHL API',
      version: '1.0.0',
      description: 'REST API for VIT Full Stack Assignment',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? 'https://your-domain.vercel.app' : `http://localhost:${PORT}`,
        description: 'API Server',
      },
    ],
  },
  apis: ['./server.js'], // Path to the API files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Helper functions
function isNumber(value) {
  return !isNaN(value) && !isNaN(parseFloat(value));
}

function isAlphabet(char) {
  return /^[A-Za-z]$/.test(char);
}

function isSpecialCharacter(char) {
  return !/^[A-Za-z0-9]$/.test(char);
}

function processData(data) {
  const oddNumbers = [];
  const evenNumbers = [];
  const alphabets = [];
  const specialCharacters = [];
  let sum = 0;
  const alphabetChars = [];

  data.forEach(item => {
    if (isNumber(item)) {
      const num = parseInt(item);
      sum += num;
      
      if (num % 2 === 0) {
        evenNumbers.push(item.toString());
      } else {
        oddNumbers.push(item.toString());
      }
    } else if (item.length === 1 && isAlphabet(item)) {
      alphabets.push(item.toUpperCase());
      alphabetChars.push(item.toLowerCase());
    } else if (item.length > 1) {
      // Handle multi-character strings
      let hasAlpha = false;
      for (let char of item) {
        if (isAlphabet(char)) {
          hasAlpha = true;
          alphabetChars.push(char.toLowerCase());
        }
      }
      if (hasAlpha) {
        alphabets.push(item.toUpperCase());
      }
    } else if (isSpecialCharacter(item)) {
      specialCharacters.push(item);
    }
  });

  // Create concatenation string with alternating caps in reverse order
  const reversedChars = alphabetChars.reverse();
  let concatString = '';
  reversedChars.forEach((char, index) => {
    concatString += index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
  });

  return {
    oddNumbers,
    evenNumbers,
    alphabets,
    specialCharacters,
    sum: sum.toString(),
    concatString
  };
}

/**
 * @swagger
 * /bfhl:
 *   post:
 *     summary: Process array data and return categorized results
 *     tags: [BFHL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of mixed data types (numbers, alphabets, special characters)
 *             example:
 *               data: ["a", "1", "334", "4", "R", "$"]
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 is_success:
 *                   type: boolean
 *                   description: Status of the operation
 *                 user_id:
 *                   type: string
 *                   description: User ID in format full_name_ddmmyyyy
 *                 email:
 *                   type: string
 *                   description: Email address
 *                 roll_number:
 *                   type: string
 *                   description: College roll number
 *                 odd_numbers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of odd numbers as strings
 *                 even_numbers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of even numbers as strings
 *                 alphabets:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of alphabets in uppercase
 *                 special_characters:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of special characters
 *                 sum:
 *                   type: string
 *                   description: Sum of all numbers as string
 *                 concat_string:
 *                   type: string
 *                   description: Concatenated alphabets in reverse order with alternating caps
 *             example:
 *               is_success: true
 *               user_id: "john_doe_17091999"
 *               email: "john@xyz.com"
 *               roll_number: "ABCD123"
 *               odd_numbers: ["1"]
 *               even_numbers: ["334", "4"]
 *               alphabets: ["A", "R"]
 *               special_characters: ["$"]
 *               sum: "339"
 *               concat_string: "Ra"
 *       400:
 *         description: Bad request - Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 is_success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *             example:
 *               is_success: false
 *               error: "Invalid input data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 is_success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */

// Main POST route
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    // Validation
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid input data. Expected an array.'
      });
    }

    // Process the data
    const result = processData(data);

    // Response with your details (UPDATE THESE WITH YOUR ACTUAL DETAILS)
    const response = {
      is_success: true,
      user_id: "your_name_ddmmyyyy", // UPDATE: Replace with your actual name and birthdate
      email: "your.email@example.com", // UPDATE: Replace with your actual email
      roll_number: "YOUR_ROLL_NUMBER", // UPDATE: Replace with your actual roll number
      odd_numbers: result.oddNumbers,
      even_numbers: result.evenNumbers,
      alphabets: result.alphabets,
      special_characters: result.specialCharacters,
      sum: result.sum,
      concat_string: result.concatString
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      error: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /bfhl:
 *   get:
 *     summary: Get operation details (for testing)
 *     tags: [BFHL]
 *     responses:
 *       200:
 *         description: Operation details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 operation_code:
 *                   type: number
 *                   example: 1
 */

// Optional GET route for testing
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'VIT BFHL API is running!',
    documentation: '/api-docs',
    endpoint: '/bfhl'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
  console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});