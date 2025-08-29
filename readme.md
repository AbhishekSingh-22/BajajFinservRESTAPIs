# VIT BFHL API

A REST API built for the VIT Full Stack assignment that processes arrays and categorizes data into numbers, alphabets, and special characters.

## Features

- ✅ Processes mixed arrays (numbers, alphabets, special characters)
- ✅ Separates odd and even numbers
- ✅ Converts alphabets to uppercase
- ✅ Identifies special characters
- ✅ Calculates sum of all numbers
- ✅ Creates concatenated string with alternating caps in reverse order
- ✅ Comprehensive Swagger API documentation
- ✅ Error handling and validation
- ✅ Ready for deployment on Vercel

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd vit-bfhl-api
```

2. Install dependencies:
```bash
npm install
```

3. Update your personal details in `server.js`:
```javascript
// Update these lines with your actual information
user_id: "your_name_ddmmyyyy",
email: "your.email@example.com", 
roll_number: "YOUR_ROLL_NUMBER",
```

4. Run the development server:
```bash
npm run dev
```

5. Visit the API documentation at: `http://localhost:3000/api-docs`

## API Endpoints

### POST /bfhl
Processes an array and returns categorized data.

**Request Body:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "your_name_ddmmyyyy",
  "email": "your.email@example.com",
  "roll_number": "YOUR_ROLL_NUMBER",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /bfhl
Returns operation code for testing purposes.

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

### Deploy to Railway

1. Connect your GitHub repository to Railway
2. Railway will automatically detect and deploy your Node.js app

### Deploy to Render

1. Connect your GitHub repository to Render
2. Set the build command to: `npm install`
3. Set the start command to: `npm start`

## Testing

Use the Swagger UI at `/api-docs` to test the API, or use curl:

```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R","$"]}'
```

## Project Structure

```
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
├── vercel.json       # Vercel deployment configuration
└── README.md         # Project documentation
```

## Important Notes

- Update your personal details (name, email, roll number) in `server.js`
- Numbers are returned as strings as per requirements
- The API follows REST conventions with proper error handling
- Swagger documentation is available at `/api-docs`