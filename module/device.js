const deviceModel = require('../model/device');

exports.getDeviceInfo = function(deviceId) {
  return deviceModel.get({ id: deviceId }).first().catch(err => {
    throw err;
  });
}

exports.getDeviceInfosByRepairmanId = function(repairmanId) {
  return deviceModel.get({ repairmanId }).catch(err => {
    throw err;
  })
}