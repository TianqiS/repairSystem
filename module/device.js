const deviceModel = require('../model/device');

exports.getDeviceInfo = async function(deviceId) {
  return await deviceModel.getItem({ id: deviceId }).first().catch(err => {
    throw err;
  });
}

exports.getDevicesInfoByRepairmanId = async function(repairmanId) {
  return await deviceModel.getItem({ repairmanId }).catch(err => {
    throw err;
  })
}