const AbstractManager = require("./AbstractManager");

class userManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname,nickname, address, city, zip_code, email, hashedPassword) values (?,?,?,?,?,?,?,?)`,
      [
        user.firstname,
        user.lastname,
        user.nickname,
        user.address,
        user.city,
        user.zip_code,
        user.email,
        user.hashedPassword,
      ]
    );
  }

  update(user) {
    return this.database.query(`update ${this.table} set ? where id = ?`, [
      user,
      user.id,
    ]);
  }

  findByEmail(email) {
    return this.database.query(`SELECT * FROM  ${this.table} WHERE email=?`, [
      email,
    ]);
  }

  updateLatLong(userId) {
    return this.database.query(
      `update ${this.table} set latitude = ?, longitude = ? where id = ?`,
      [userId.latitude, userId.longitude, userId.id]
    );
  }
}

module.exports = userManager;
