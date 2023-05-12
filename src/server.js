const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const mongoose = require('mongoose');
const compression = require('compression');
const routes = require('./router/v1');
const { errorConverter, errorHandler } = require('./middleware/error');
const { validateToken } = require('./middleware/oauth');
const use  = require('./utils/use');

const port = process.env.PORT || 8000;
const app = express();

if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
}

mongoose.connect("mongodb+srv://ali:H9N4kqb6d9R4UIX4@cluster0.ikrzkk5.mongodb.net/db-0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
});


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss())
app.use(mongoSanitize());
app.use(compression());
app.use(cors());
app.options('*', cors())

app.use(use(validateToken))
app.use('/v1', routes);

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;