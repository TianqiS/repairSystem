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

exports.createNewDevice = async function(deviceInfo) {
  return deviceModel.insertItem(deviceInfo).catch(err => {
    throw err;
  })
}

exports.getDeviceInfoList = async function() {
  return deviceModel.getDeviceInfoAndStaffInfo({}).then(deviceInfoList => {
    deviceInfoList.forEach(deviceInfo => {
      deviceInfo.update_time = moment(deviceInfo.update_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
    });
    return deviceInfoList;
  }).catch(err => {
    throw err;
  });
}

exports.updateDeviceInfo = async function(deviceInfo) {
  const id = deviceInfo.id;
  delete deviceInfo.id;
  return deviceModel.updateItem({ id }, deviceInfo).catch(err => {
    throw err;
  })
}