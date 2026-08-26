const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

//get all tours
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { ...tours },
  });
};

///////////////////////
//get single tour
exports.getSingleTour = (req, res) => {
  const id = req.params.id;
  const tour = tours.find((tour) => tour.id === +id);
  res.status(200).json({
    status: 'success',
    data: { ...tour },
  });
};

///////////////////////
//delete tour
exports.deleteTour = (req, res) => {
  const index = tours.findIndex((el) => el.id === +req.params.id);
  tours.splice(index, 1);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.error(err.message);
      res.status(204).send({
        status: 'success',
        data: null,
      });
    },
  );
};

///////////////////////
//post new tour
exports.createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = {
    id: newID,
    ...req.body,
  };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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
};
///////////////////////
//patch tour
exports.updateTour = (req, res) => {
  const tourId = req.params.id;
  const tour = tours.find((tour) => tour.id === +tourId);

  const updatedTour = { ...tour, ...req.body };
  const index = tours.findIndex((tour) => tour.id === +tourId);
  tours[index] = { ...updatedTour };
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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
};

//
