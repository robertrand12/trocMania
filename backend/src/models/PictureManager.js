const AbstractManager = require("./AbstractManager");

class pictureManager extends AbstractManager {
  constructor() {
    super({ table: "picture" });
  }

  insert(picture) {
    return this.database.query(
      `insert into ${this.table} (source, ad_id) values (?,?)`,
      [picture.source, picture.ad_id]
    );
  }
}

module.exports = pictureManager;
