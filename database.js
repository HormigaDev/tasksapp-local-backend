const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.resolve('C:/BbelStudio/Apps/Tasks/database.sqlite3'));
const fs = require('fs');
const createQuery = fs.readFileSync(path.resolve(__dirname, 'sql/createDatabase.sql'), { encoding: 'utf-8' });

db.read = (type, name) => {
  const dir = parh.resolve(__dirname, 'sql', type, `${name}.sql`);
  return fs.readFileSync(dir, { encoding: 'utf-8'});
}

db.serialize(() => {
  db.exec(createQuery, (err) => {
    if(err){
      console.error(err);
    }
  });
});

module.exports = db;