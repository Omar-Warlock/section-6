const express = require('express');
const fs = require('fs');
const app = express();

//middleware
app.use(express.json());

////////////////////////////////////////
// simple routing
// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });
/////////////////////////////////////////

//////////////////////
// Read tours file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

//get all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { ...tours },
  });
});

///////////////////////
//get single tour
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const tour = tours.find((tour) => tour.id === +id);
  console.log(tour);
  if (tour) {
    res.status(200).json({
      status: 'success',
      data: { ...tour },
    });
  } else {
    res.status(404).json({
      status: 'failed',
      message: 'not-found',
    });
  }
});

///////////////////////
//post new tour
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);

  const newID = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newID,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
});

///////////////////////
//patch tour
app.patch('/api/v1/tours/:id', (req, res) => {
  const tourId = req.params.id;
  const tour = tours.find((tour) => tour.id === +tourId);

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'not found',
    });
  } else {
    const updatedTour = { ...tour, ...req.body };
    const index = tours.findIndex((tour) => tour.id === +tourId);
    tours[index] = { ...updatedTour };
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(200).json({
          status: 'success',
          data: {
            tour: { ...updatedTour },
          },
        });
      },
    );
  }
});

///////////////////////
//delete tour
app.delete('/api/v1/tours/:id', (req, res) => {
  const index = tours.findIndex((el) => el.id === +req.params.id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  tours.splice(index, 1);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.error(err.message);
      res.status(204).send({
        status: 'success',
        data: null,
      });
    },
  );
});
///////////////////////////////////////////
// server
///////////////////////////////////////////
const port = 3000;
app.listen(port, (err, data) => {
  if (!err) console.log(`App running on port ${port}...`);
});
