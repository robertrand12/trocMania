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

  findAllMyPicturesByAd(picture) {
    return this.database.query(`select * from  ${this.table} where ad_id = ?`, [
      picture,
    ]);
  }
}

module.exports = pictureManager;
