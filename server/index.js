// bootstrap node server
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/dev');

// routes
const rentalsRoutes = require('./routes/rentals');
const usersRoutes = require('./routes/users');

// models
require('./models/rental');
require('./models/user');

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
// api - user routes
app.use('/api/users', usersRoutes);

app.listen(PORT, () => {
  	console.log(`Server listening at http://localhost:${PORT}`);
});