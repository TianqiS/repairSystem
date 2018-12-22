const adminModel = require('../model/admin');

exports.getAdminInfo = async function(userName) {
  return adminModel.getItem({
    user_name: userName,
  }).first().catch(err => {
    throw err;
  })
}