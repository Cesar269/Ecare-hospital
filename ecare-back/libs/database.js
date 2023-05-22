var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5'); // TODO: Change to HASH2

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }else {
    console.log('Conectando');
    // tabla de productos
    db.run('CREATE TABLE product ( ' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'name TEXT, ' +
      'description TEXT, ' +
      'price FLOAT, ' +
      'old_price FLOAT, ' +
      'image_url TEXT, ' +
      'review FLOAT ' +
      ')',
    (err) => {
      if (!err) {
        // La tabla se acaba de crear
        var insert  = 'INSERT INTO product (name, description, price, old_price, image_url, review) VALUES (?,?,?,?,?,?)';
        db.run(insert, ['Tenis Marca Vocho', '5 colores disponibles', '200.0', '500.0', 'C:\\Users\\david\\Documents\\GitHub\\Plantilla-03\\back-ecommerce\\images\\tenis.png', '5']);
        db.run(insert, ['Tenis Marca Vocho', '5 colores disponibles', '200.0', '500.0', 'C:\\Users\\david\\Documents\\GitHub\\Plantilla-03\\back-ecommerce\\images\\tenis.png', '5']);
        db.run(insert, ['Tenis Marca Vocho', '5 colores disponibles', '200.0', '500.0', 'C:\\Users\\david\\Documents\\GitHub\\Plantilla-03\\back-ecommerce\\images\\tenis.png', '5']);
        db.run(insert, ['Tenis Marca Vocho', '5 colores disponibles', '200.0', '500.0', 'C:\\Users\\david\\Documents\\GitHub\\Plantilla-03\\back-ecommerce\\images\\tenis.png', '5']);
        db.run(insert, ['Tenis Marca Vocho', '5 colores disponibles', '200.0', '500.0', 'C:\\Users\\david\\Documents\\GitHub\\Plantilla-03\\back-ecommerce\\images\\tenis.png', '5']);
      }
    });
    // tabla de usuarios
    db.run('CREATE TABLE user ( ' +
    //  'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'name TEXT, ' +
      'password TEXT, ' +
      'UNIQUE(name) ' +
      ')',
    (err) => {
      if (!err) {
        // La tabla se acaba de crear
        var insert  = 'INSERT INTO user (name, password) VALUES (?,?)';
        db.run(insert, ['admin', md5('admin')]);
      }
    });
    // tabla de carrito
    db.run('CREATE TABLE cart ( ' +
      'name TEXT NOT NULL, ' +
      'product_id INTEGER NOT NULL, ' +
      'FOREIGN KEY (name) REFERENCES user(name), ' +
      'FOREIGN KEY (product_id) REFERENCES product(id), ' +
      'PRIMARY KEY (name, product_id) ' +
      ')',
    (err) => {
      if (!err) {
        // La tabla se acaba de crear
      }
    });
  }
});

module.exports = db;
