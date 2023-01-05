const express = require('express');
const cors = require('cors');

const app = express();

const corOptions = { origin: 'https://localhost:5001' };

// routers
const router = require('./src/routes/userRouter.js');

app.use('/api/user', router);

// middleware
app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// testing api
app.get('/', (req, res) => res.json({ message: 'API works!' }));


//port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
