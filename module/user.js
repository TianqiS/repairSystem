const userModel = require('../model/user');

exports.getUserInfo = async function(userId) {
  return userModel.getItem({
    user_id: userId
  }).catch(err => {
    throw err;
  })
}