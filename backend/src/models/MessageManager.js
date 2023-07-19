const AbstractManager = require("./AbstractManager");

class messageManager extends AbstractManager {
  constructor() {
    super({ table: "message" });
  }

  insert(message) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      message.title,
    ]);
  }
}

module.exports = messageManager;
