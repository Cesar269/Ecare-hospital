var db = require('../libs/database.js');
var md5 = require('md5');

class UsersService {
  async create(data) {
    var sql = 'INSERT INTO user (name, password) VALUES (?, ?)';
    var params = [data.name, md5(data.password)];
    db.run(sql, params, function (err, result) {
      if (!err) {
        return result;
      }else {
        throw err;
      }
    });
  }

  async find() {
    return new Promise((resolve, reject) => {
      var sql = 'SELECT * FROM user';
      var params = [];
      db.all(sql, params, (err, rows) => {
        if (!err) {
          resolve(rows);
        }else {
          reject(err);
        }
      });
    });
  }

  async getUserCart(name) {
    return new Promise((resolve, reject) => {
      var sql = 'SELECT product.name, product.description, product.price, product.image_url FROM cart INNER JOIN product ON (cart.product_id = product.id) WHERE cart.name = ?';
      var params = [name];
      db.all(sql, params, (err, rows) => {
        if (!err) {
          resolve(rows);
        }else {
          reject(err);
        }
      });
    });
  }

  async addIntoCart(data) {
    var sql = 'INSERT INTO cart (name, product_id) VALUES (?,?)';
    var params = [data.name, data.product_id];
    db.run(sql, params, function (err, result) {
      if (!err) {
        return result;
      }else {
        throw err;
      }
    });
  }

  async deleteFromCart(data) {
    var sql = 'DELETE FROM cart WHERE name = ? AND product_id = ?';
    var params = [data.name, data.product_id];
    db.run(sql, params, function (err, result) {
      if (!err) {
        return result;
      }else {
        throw err;
      }
    });
  }

  async login(data) {
    return new Promise((resolve, reject) => {
      var sql = 'SELECT * FROM user WHERE name = ?';
      var params = [data.name];
      db.all(sql, params, (err, rows) => {
        if (!err) {
          resolve(rows);
        }else {
          reject(err);
        }
      });
    });

  }

  //async findOne(name) ?

  //async delete(name) ?
}

module.exports = UsersService;
