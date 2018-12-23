const Model = require('../utils/Model');
let deviceModel = new Model('device');

deviceModel.getDeviceInfoAndStaffInfo = function(query) {
  return deviceModel.getTable().leftJoin('repairman', 'device.repairman_id', '=', 'repairman.staff_id').where(query);
}

module.exports = deviceModel;
