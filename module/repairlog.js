const moment = require('moment');
const repairlogModel = require('../model/repairlog');

exports.getDeviceRepairlog = async function(repairmanId, deviceId) {
  return repairlogModel.getRepairLogAndDetails({
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
  return repairlogModel.getItem({}).offset((page * 1 - 1) * perPage).limit(perPage * 1).catch(err => {
    throw err;
  })
}