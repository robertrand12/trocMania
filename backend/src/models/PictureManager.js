const AbstractManager = require("./AbstractManager");

class pictureManager extends AbstractManager {
  constructor() {
    super({ table: "picture" });
  }

  insert(picture) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      picture.title,
    ]);
  }
}

module.exports = pictureManager;
