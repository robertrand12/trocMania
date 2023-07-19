const AbstractManager = require("./AbstractManager");

class favoriteManager extends AbstractManager {
  constructor() {
    super({ table: "favorite" });
  }

  insert(favorite) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      favorite.title,
    ]);
  }
}

module.exports = favoriteManager;
