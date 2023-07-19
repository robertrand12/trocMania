const AbstractManager = require("./AbstractManager");

class adManager extends AbstractManager {
  constructor() {
    super({ table: "ad" });
  }

  insert(ad) {
    return this.database.query(
      `insert into ${this.table} (title, price, description, date, state, category, user_id) values (?,?,?,NOW(),?,?,?)`,
      [ad.title, ad.price, ad.description, ad.state, ad.category, ad.user_id]
    );
  }

  update(ad) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      ad,
      ad.id,
    ]);
  }
}

module.exports = adManager;
