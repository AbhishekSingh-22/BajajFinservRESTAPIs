const { processData } = require("../utils/helperFunctions.js");

const bfhlPost = async (req, res) => {
  try {
    let data;
    if (typeof req.body === "string") {
      const inputBody = JSON.parse(req.body);
      data = inputBody.data;
    } else {
      data = req.body.data;
    }

    // Validation
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input data. Expected an array.",
      });
    }

    // Process the data
    const result = processData(data);

    // Response with your details (UPDATE THESE WITH YOUR ACTUAL DETAILS)
    const response = {
      is_success: true,
      user_id: "abhishek_singh_29082003",
      email: "abhisheksingh.vizag@gmail.com",
      roll_number: "22BCE10664",
      odd_numbers: result.oddNumbers,
      even_numbers: result.evenNumbers,
      alphabets: result.alphabets,
      special_characters: result.specialCharacters,
      sum: result.sum,
      concat_string: result.concatString,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error",
      errorMessage: error.message,
    });
  }
};

const bfhlGet = async (req, res) => {
  try {
    res.status(200).json({
      message: `I used MVC architecture to create separation of concerns for routes and controller. I added Swagger docs as well.
      
      Logic behind development:
        1. The input can be in any format either in plain text or json form -> I have handled that first by checking the content type and converting it into JSON format
        2. I created different helper functions to process the input data
        3. Returned the process data in clean format
      `,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  bfhlPost,
  bfhlGet,
};
