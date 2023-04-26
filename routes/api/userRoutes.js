const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  postUser,
  deleteUser,
  updateUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(postUser);

router.route('/:userId').get(getOneUser).delete(deleteUser);


module.exports = router;
