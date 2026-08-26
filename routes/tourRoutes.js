const express = require('express');
const {
  getAllTours,
  createTour,
  getSingleTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');
const { checkID, checkBody } = require('../middlewares/middlware');

const router = express.Router();
router.param('id', checkID);
router.route('/').get(getAllTours).post(checkBody, createTour);
// get single tour , delete , patch tour
router.route('/:id').get(getSingleTour).patch(updateTour).delete(deleteTour);

module.exports = router;
