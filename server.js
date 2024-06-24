const express = require('express');
const color = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

const app = express();

// dot env configuration
dotenv.config();

//DB Connection
connectDb()

const PORT = process.env.PORT || 3000;  

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/test",require("./routes/testRoutes"))
app.use("/api/auth",require("./routes/authRoutes"))
app.use("/api/user",require("./routes/userRoutes"))
app.use("/api/restuarant",require("./routes/restuarantRoutes"))
app.use('/api/category',require('./routes/categoryRoutes'))
app.use('/api/food',require('./routes/foodRoutes'))
app.get('/', function (req, res) {
  res.send('Hello World');
});



//port listen
app.listen(PORT, () => {
  console.log(`Server Running On ${PORT}`.bgGreen);
});
