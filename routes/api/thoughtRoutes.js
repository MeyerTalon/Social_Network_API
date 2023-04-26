const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  postThought,
  deleteThought,
  updateThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(postThought);

router.route('/:thoughtId').get(getOneThought).delete(deleteThought);


module.exports = router;
