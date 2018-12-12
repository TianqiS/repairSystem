const repairemanModel = require('../model/repaireman');

exports.getRepairemanInfo = async function(phone) {
  return await repairemanModel.getItem(phone).first().catch(err => {
    if(err) throw err;
  });
}

exports.addNewRepaireman = async function(information) {
  return await repairemanModel.insertItem({...information}).catch(err => {
    if(err) throw err;
  })
}