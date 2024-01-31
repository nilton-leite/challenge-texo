const Datastore  = require('nedb');
const db = new Datastore('movies.db');
class connectDB {
    connect() {
      
      db.loadDatabase();

      return db
      
    }

    getDb() {
      return db
    }
}

module.exports = new connectDB();
