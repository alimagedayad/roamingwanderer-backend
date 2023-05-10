const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const mongoose = require('mongoose');
const compression = require('compression');
const routes = require('./router/v1');
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middleware/error');

const port = process.env.PORT || 8000;
const app = express();

if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
}

mongoose.connect("", {
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

app.use('/v1', routes);

// app.use((req, res, next) => {
//     next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });
  
// app.use(errorConverter);
// app.use(errorHandler);



module.exports = app;