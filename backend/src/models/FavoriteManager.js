const AbstractManager = require("./AbstractManager");

class favoriteManager extends AbstractManager {
  constructor() {
    super({ table: "favorite" });
  }

  insert(favorite) {
    return this.database.query(
      `insert into ${this.table} (ad_id, user_id) values (?,?)`,
      [favorite.ad_id, favorite.user_id]
    );
  }

  findByUserIdAdId(adId, userId) {
    return this.database.query(
      `select * from  ${this.table} where ad_id = ? and user_id = ?`,
      [adId, userId]
    );
  }

  findAllFavorites(id) {
    return this.database.query(
      `select f.id, f.ad_id, f.user_id, ad.id, ad.title, ad.price, ad.description, ad.state, ad.category, p.source from favorite as f join ad on ad.id=f.ad_id left join picture as p on p.ad_id=ad.id where f.user_id=? order by ad.id`,
      [id]
    );
  }
}

module.exports = favoriteManager;
