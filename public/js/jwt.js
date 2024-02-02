// Import the jsonwebtoken library
const jwt = require('jsonwebtoken');

// Function to decode JWT token
const decodeJwt = (token) => {
  try {
    // Replace 'your_jwt_secret' with your actual JWT secret
    const decoded = jwt.verify(token, 'your_jwt_secret');
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export default decodeJwt;
