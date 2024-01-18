const cors = require("cors");

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

module.exports = corsOptions;