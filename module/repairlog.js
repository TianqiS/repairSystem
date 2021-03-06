const moment = require('moment');
const repairlogModel = require('../model/repairlog');
const userModel = require('../model/user');
const repairmanModel = require('../model/repairman');

exports.getDeviceRepairlog = async function(repairmanId, deviceId) {
  let query = {
    'repairlog.repairman_id': repairmanId
  };
  if(deviceId) query.device_id = deviceId;
  return repairlogModel.getRepairlogAndDetails(query).then(repairLogs => {
    repairLogs.forEach(repairLog => {
      if(repairLog.repair_time)repairLog.repair_time = moment(repairLog.repair_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
      if(repairLog.finish_time)repairLog.finish_time = moment(repairLog.finish_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
      if(repairLog.update_time)repairLog.update_time = moment(repairLog.update_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
    })
    return repairLogs;
  }).catch(err => {
    throw err;
  });
}

exports.getSpecialLog = async function(logId) {
  return repairlogModel.getItem({log_id: logId}).first().then(log => {
    if(log.repair_time) log.repair_time = moment(log.repair_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
    if(log.finish_time) log.finish_time = moment(log.finish_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
    return log;
  }).catch(err => {
    throw err;
  })
}

exports.getRepairlogList = async function(page, perPage) {
  let repailogsList = await repairlogModel.getItem({}).offset((page * 1 - 1) * perPage).limit(perPage * 1).catch(err => {
    throw err;
  });
  if(!repailogsList.length) return [];
  let list = [];
  let count = 0;
  await new Promise(function(resolve) {
    return repailogsList.forEach(async (repairlog, i) => {
      if(repairlog.repair_time)repairlog.repair_time = moment(repairlog.repair_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
      if(repairlog.finish_time)repairlog.finish_time = moment(repairlog.finish_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
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

exports.createLog = async function(logInfo) {
  return repairlogModel.insertItem(logInfo).catch(err => {
    throw err;
  })
}

exports.updateRepairlog = async function(logId, updateInfo) {
  return repairlogModel.updateItem({
    log_id: logId,
    log_status: -1
  }, updateInfo).catch(err => {
    throw err;
  })
}

exports.deleteRepairlog = async function(logId) {
  return repairlogModel.deleteItem({log_id: logId}).catch(err => {
    throw err;
  })
}