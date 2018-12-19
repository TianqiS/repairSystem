const moment = require('moment');
const repairlogModel = require('../model/repairlog');

exports.getDeviceRepairlog = async function(repairmanId, deviceId) {
  return repairlogModel.getRepairLogAndDetails({
    'repairlog.repairmanId': repairmanId,
    deviceId,
  }).then(repairLogs => {
    repairLogs.forEach(repairLog => {
      repairLog.repairTime = moment(repairLog.repairTime.getTime()).format('YYYY-MM-DD HH:mm:ss');
      repairLog.finishTime = moment(repairLog.finishTime.getTime()).format('YYYY-MM-DD HH:mm:ss');
      repairLog.update_time = moment(repairLog.update_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
    })
    return repairLogs;
  });
}