const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.join(process.env.ROOT, 'BbelStudio/Apps/Tasks/database.db'));
const fs = require('fs');
const configurations = require('./configs.js');

db.read = (type, name) => {
  const dir = path.resolve(__dirname, 'sql', type, `${name}.sql`);
  return fs.readFileSync(dir, { encoding: 'utf-8'});
}
db.begin = () => {
  return new Promise((resolve) => {
    db.run('begin transaction', (err) => {
      if(err){
        // console.log(err);
        resolve(false);
      }
      resolve(true);
    });
  });
}
db.rollback = () => {
  return new Promise((resolve) => {
    db.run('rollback', (err) => {
      if(err){
        // console.log(err);
        resolve(false);
      }
      resolve(true);
    });
  });
}
db.commit = () => {
  return new Promise((resolve) => {
    db.run('commit', (err) => {
      if(err){
        // console.log(err);
        resolve(false);
      }
      resolve(true);
    });
  });
}
db.last_rowid = () => {
  return new Promise((resolve) => {
    db.get('select last_insert_rowid() as id', (err, row) => {
      if(err){
        // console.log(err);
        resolve(false);
      }
      resolve(row.id);
    });
  })
}

function createTables(){
  return new Promise((resolve) => {
    db.serialize(async () => {
      await db.begin();
      db.exec(db.read('create', 'database'), async (err) => {
        if(err){
          // console.error(err);
          await db.rollback();
          resolve(false);
        } else {
          await db.commit();
          resolve(true);
        }
      });
    });
  })
}

async function createDatabase(){
  if(configurations.get('databased') === true) return;
  await createTables();
  configurations.set('databased', true);
}
db.createDatabase = createDatabase;

module.exports = db;