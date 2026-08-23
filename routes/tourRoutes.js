const express = require('express');
const {
  getAllTours,
  createTour,
  getSingleTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');
const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
// get single tour , delete , patch tour
router.route('/:id').get(getSingleTour).patch(updateTour).delete(deleteTour);

module.exports = router;
