const repairmanModel = require('../model/repairman');

exports.getRepairmanInfo = async function(info) {
  return await repairmanModel.getItem(info).first().catch(err => {
    if(err) throw err;
  });
}

exports.addNewRepairman = async function(information) {
  return await repairmanModel.insertItem({...information}).catch(err => {
    if(err) throw err;
  })
}

exports.getRepairmanList = async function() {
  return repairmanModel.getItem({}).catch(err => {
    throw err;
  })
}