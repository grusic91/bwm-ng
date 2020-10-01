// bootstrap node server
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/dev');

// routes
const rentalsRoutes = require('./routes/rentals');

// models
const Rental = require('./models/rental');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(config.DEV_DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}, () => {console.log('Connected to the DB!')});

// parse application/json
app.use(bodyParser.json());

// api - rental routes
app.use('/api/rentals', rentalsRoutes);

app.listen(PORT, () => {
  	console.log(`Server listening at http://localhost:${PORT}`);
});