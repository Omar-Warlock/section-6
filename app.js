const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const app = express();

//middleware
app.use(express.json());

app.use(morgan('dev'));

// our own middleware
app.use((req, res, next) => {
  console.log('hello from the middleware 🙋‍♂️');
  next();
});

// route handlers
//////////////////////
// Read tours file

//////////////////////
/////////////////////////
// User Route Handlers

////////////////////////////////////////////
////////////////////////////////////////////

/////////////////////////////////////////////
/////////////////////////////////////////////
//Routes
/////
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getSingleTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// get all tours and add new tour

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/////////////////////////////////////////////
/////////////////////////////////////////////

///////////////////////////////////////////
// server
///////////////////////////////////////////
const port = 3000;
app.listen(port, (err, data) => {
  if (!err) console.log(`App running on port ${port}...`);
});
