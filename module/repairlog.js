const repairlogModel = require('../model/repairlog');

exports.getDeviceRepairlog = async function(repairmanId, deviceId) {
  return repairlogModel.getRepairLogAndDetails({
    'repairlog.repairmanId': repairmanId,
    deviceId,
  });
}