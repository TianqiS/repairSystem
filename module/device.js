const moment = require('moment');
const deviceModel = require('../model/device');

exports.getDeviceInfo = async function(deviceId) {
  return deviceModel.getItem({ id: deviceId }).first().then(deviceInfo => {
    deviceInfo.update_time = moment(deviceInfo.update_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
    return deviceInfo;
  }).catch(err => {
    throw err;
  });
}

exports.getDevicesInfoByRepairmanId = async function(repairmanId) {
  return deviceModel.getItem({ repairman_id: repairmanId }).catch(err => {
    throw err;
  })
}