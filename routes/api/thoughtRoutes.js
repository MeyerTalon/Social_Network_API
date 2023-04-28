const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  postThought,
  deleteThought,
  updateThought,
  postReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(postThought);

router.route('/:thoughtId').get(getOneThought).delete(deleteThought).put(updateThought);

router.route('/:thoughtId/reactions').post(postReaction).delete(deleteReaction);


module.exports = router;
