var db = require('../libs/database.js');

class ProductsService {
  async create(data, image_url) {
    var sql = 'INSERT INTO product (name, description, price, old_price, image_url, review) VALUES (?, ?, ?, ?, ?, ?)';
    // TODO: Save image
    var params = [data.name, data.description, data.price, data.old_price, image_url, data.review];
    db.run(sql, params, function (err, result) {
      if (!err) {
        return result;
      }else {
        throw err;
      }
    });
  }

  async find() {
    return new Promise(resolve => {
      var sql = 'SELECT * FROM product';
      var params = [];
      db.all(sql, params, (err, rows) => {
        if (!err) {
          resolve(rows);
        }else {
          throw err;
        }
      });
    });
  }

  async findOne(id) {
    return new Promise((resolve, reject) => {
      var sql = 'SELECT * FROM product WHERE id = ?';
      var params = [id];
      db.get(sql, params, (err, row) => {
        if(!err) {
          if (row) {
            resolve(row);
          }else {
            reject(new Error('Product not found'));
          }
        }else {
          reject(err);
        }
      });
    });
  }

  async delete(id) {
    var sql = 'DELETE FROM product WHERE id = ?';
    var params = [id];
    db.get(sql, params, function (err, result) {
      if (!err) {
        return result;
      }else {
        throw err;
      }
    });
  }
}

module.exports = ProductsService;
