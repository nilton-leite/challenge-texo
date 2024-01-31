const { getDb } = require("../../config/db");

class MovieRepository {
    constructor() {
        this.db = getDb();
      }
    async insert(body) {
       return new Promise((resolve, reject) => {
        this.db.insert(body, (err, docs) => {
          if (err) {
            return reject(err);
          }
          resolve(docs);
        });
      });
    }
    async update(id, body) {
       return new Promise((resolve, reject) => {
        this.db.update(id, {$set: {...body}}, (err, docs) => {
          if (err) {
            return reject(err);
          }
          resolve(docs);
        });
      });
    }
    async delete(id) {
       return new Promise((resolve, reject) => {
        this.db.remove(id, (err, docs) => {
          if (err) {
            return reject(err);
          }
          resolve(docs);
        });
      });
    }
    async allByWinner() {
       return new Promise((resolve, reject) => {
        this.db.find({"winner": "yes"}, (err, docs) => {
          if (err) {
            return reject(err);
          }
          resolve(docs);
        });
      });
    }
    async allByWinnerAndProduces(producer) {
        let regexObj = new RegExp(producer);
        
       return new Promise((resolve, reject) => {
        this.db.find({"producers": regexObj}, (err, docs) => {
          if (err) {
            return reject(err);
          }
          resolve(docs);
        });
      });
    }

}

module.exports = new MovieRepository();