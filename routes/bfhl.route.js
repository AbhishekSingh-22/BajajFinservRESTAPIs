const {Router} = require("express");
const {bfhlPost, bfhlGet} = require("../controllers/bfhl.controller.js");

const router = Router();

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
router.post("/", bfhlPost)

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
router.get("/", bfhlGet)

module.exports = router;
