const moment = require('moment');
const deviceModel = require('../model/device');

exports.getDeviceInfo = async function(deviceId) {
  return deviceModel.getItem({ id: deviceId }).first().then(deviceInfo => {
    if(deviceInfo.update_time) deviceInfo.update_time = moment(deviceInfo.update_time.getTime()).format('YYYY-MM-DD HH:mm:ss');
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

exports.updateDeviceInfo = async function(deviceId, deviceInfo) {
  return deviceModel.updateItem({ id: deviceId }, deviceInfo).catch(err => {
    throw err;
  })
}

exports.deleteDevice = async function(deviceId) {
  return deviceModel.deleteItem({id: deviceId}).catch(err => {
    throw err;
  })
}