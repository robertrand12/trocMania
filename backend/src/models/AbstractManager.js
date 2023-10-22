class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  findAds(id) {
    return this.database.query(
      `select ad.id, ad.title, ad.price, ad.description, ad.date, ad.state, ad.category, ad.user_id, ad.verified, p.source from ad left join picture as p on p.ad_id=ad.id where ad.id = ? order by ad.id`,
      [id]
    );
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  findAllAds() {
    return this.database.query(
      `select ad.id, ad.title, ad.price, ad.description, ad.date, ad.state, ad.category, ad.user_id, ad.verified, p.source from ad left join picture as p on p.ad_id=ad.id where ad.verified = true order by ad.id`
    );
  }

  findAllAdsNotVerified() {
    return this.database.query(
      `select ad.id, ad.title, ad.price, ad.description, ad.date, ad.state, ad.category, ad.user_id, ad.verified, p.source from ad left join picture as p on p.ad_id=ad.id where ad.verified = false order by ad.id`
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = AbstractManager;
