const repairmanModel = require('../model/repairman');

exports.getRepairmanInfo = async function(phone) {
  return await repairmanModel.getItem(phone).first().catch(err => {
    if(err) throw err;
  });
}

exports.addNewRepairman = async function(information) {
  return await repairmanModel.insertItem({...information}).catch(err => {
    if(err) throw err;
  })
}