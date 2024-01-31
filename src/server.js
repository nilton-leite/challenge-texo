
const server = require('./app');
const Datastore  = require('nedb');
const csv = require('csv-parser')
const fs = require('fs');
const { connect } = require('./config/db');
const db = connect();
// const db = new Datastore('movies.db');
// db.loadDatabase();
const results = [];

fs.createReadStream('movielist.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    let exists = null
    const exist = db.find({}, (error,itemDb) => {
        if (itemDb.length > 0 ){
            console.log(`Dados de CSV já exportados para o banco local - ${itemDb.length}`)
        } else {
            console.log(`Inserindo ${results.length} registros na base de dados local`)
            results.map(async (item) => {
                db.insert({ year: item.year, title: item.title, studios: item.studios, producers: item.producers, winner: item.winner  })
            })
        }
    });
  });

const listen = server.listen(process.env.PORT || 3333);
console.log(`Server listening in PORT ${process.env.PORT || 3333}`)
module.exports = listen