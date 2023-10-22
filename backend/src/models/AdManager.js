const AbstractManager = require("./AbstractManager");

class adManager extends AbstractManager {
  constructor() {
    super({ table: "ad" });
  }

  insert(ad) {
    return this.database.query(
      `insert into ${this.table} (title, price, description, state, category, user_id) values (?,?,?,?,?,?)`,
      [ad.title, ad.price, ad.description, ad.state, ad.category, ad.user_id]
    );
  }

  update(ad) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      ad,
      ad.id,
    ]);
  }

  verifyAd(id) {
    return this.database.query(
      `update ${this.table} set verified = true where id = ?`,
      [id]
    );
  }

  findAllMyAds(id) {
    return this.database.query(
      `select ad.id, ad.title, ad.price, ad.description, ad.state, ad.category, ad.user_id, ad.verified, p.source from ad left join picture as p on p.ad_id=ad.id where user_id = ? order by ad.id`,
      [id]
    );
  }

  findAllByCategory(category) {
    return this.database.query(
      `select ad.id, ad.title, ad.price, ad.description, ad.state, ad.category, ad.user_id, p.source from ad left join picture as p on p.ad_id=ad.id where ad.category = ? and ad.verified = true order by ad.id`,
      [category]
    );
  }
}

module.exports = adManager;
