require('dotenv').config;
const express = require('express');
const cors = require('cors');
const bodyParser = require('express');
const app = express();

const corOptions = { origin: 'https://localhost:5001' };

// middleware
app.use(cors(corOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// testing api
app.get('/', (req, res) => res.json({ message: 'API works!' }));

// routers
const router = require('./src/routes/userRouter.js');
app.use('/api/user', router);

//port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
