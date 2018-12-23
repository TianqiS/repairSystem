const moment = require('moment');
const repairlogModel = require('../model/repairlog');
const userModel = require('../model/user');
const repairmanModel = require('../model/repairman');

exports.getDeviceRepairlog = async function(repairmanId, deviceId) {
  return repairlogModel.getRepairlogAndDetails({
    'repairlog.repairman_id': repairmanId,
    device_id: deviceId,
  }).then(repairLogs => {
    repairLogs.forEach(repairLog => {
      repairLog.repairTime = moment(repairLog.repair_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
      repairLog.finishTime = moment(repairLog.finish_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
      repairLog.update_time = moment(repairLog.update_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
    })
    return repairLogs;
  }).catch(err => {
    throw err;
  });
}

exports.getSpecialLog = async function(logId) {
  return repairlogModel.getItem({log_id: logId}).first().then(log => {
    log.repair_time = moment(log.repair_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
    log.finish_time = moment(log.finish_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
    return log;
  }).catch(err => {
    throw err;
  })
}

exports.getRepairlogList = async function(page, perPage) {
  let repailogsList = await repairlogModel.getItem({}).offset((page * 1 - 1) * perPage).limit(perPage * 1).catch(err => {
    throw err;
  });
  let list = [];
  let count = 0;
  await new Promise(function(resolve) {
    return repailogsList.forEach(async (repairlog, i) => {
      let result = {...repairlog};
      let userInfo = await userModel.getItem({user_id: repairlog.user_id}).first();
      let repairmanInfo = await repairmanModel.getItem({staff_id: repairlog.repairman_id}).first();
      result.userInfo = userInfo;
      result.repairmanInfo = repairmanInfo;
      list.push(result);
      if(i === repailogsList.length - 1) return resolve();
    })
  }).catch(err => {
    throw err;
  })
  return list;
}