const router = require('express').Router();
const {
  getUsers,
  getOneUser,
  postUser,
  deleteUser,
  updateUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(postUser);

router.route('/:userId').get(getOneUser).delete(deleteUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;
