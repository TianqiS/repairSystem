const db = require('./db');

function Model(tableName) {
  this.tableName = tableName;
}

Model.prototype.getTable = function() {
  return db.from(this.tableName);
}

Model.prototype.getItem = function(query) {
  return this.getTable().where(query);
}

Model.prototype.insertItem = function(query) {
  return this.getTable().insert(query);
}

Model.prototype.deleteItem = function(query) {
  return this.getItem(query).del();
}

Model.prototype.updateItem = function(query, updateInfo) {
  return this.getItem(query).update(updateInfo);
}

module.exports = Model;

