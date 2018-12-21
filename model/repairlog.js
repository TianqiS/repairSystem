const Model = require('../utils/Model');
let repairlogModel = new Model('repairlog');

repairlogModel.getRepairLogAndDetails = function(query) {
  return repairlogModel.getTable().innerJoin('device', 'repairLog.device_id', '=', 'device.id').where(query);
}

module.exports = repairlogModel;