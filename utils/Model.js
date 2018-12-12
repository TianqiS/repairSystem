const db = require('./db');

function Model(tableName) {
  this.tableName = tableName;
}

Model.prototype.getItem = function(query) {
  return db.from(this.tableName).where(query);
}

Model.prototype.insertItem = function(query) {
  return db.from(this.tableName).insert(query);
}

Model.prototype.deleteItem = function(query) {
  return this.getItem(query).del();
}

Model.prototype.updateItem = function(query, updateInfo) {
  return this.getItem(query).update(updateInfo);
}

