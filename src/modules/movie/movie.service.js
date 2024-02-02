const movieRepository = require("./movie.repository");

class MovieService {

    async create(body) {
        await movieRepository.insert(body);
        return {statusCode: 201, message: 'Movie created successfully' };
    }

    async update(id,body) {
        const film = await movieRepository.update({_id: id}, body);
        return {statusCode: 200, data: "Movie updated successfully"};
    }

    async delete(id,body) {
        await movieRepository.delete({_id: id});
        return {statusCode: 200, data: "Movie removed successfully"};
    }
   
    async all() {
        const results = await movieRepository.allByWinner()
        const producersFinish = []
        const resultProducer = results.map(async (item) => {
            if (item.producers.indexOf(",") !== -1) {
                // Caso tenha mais de um produtor
                const producer = item.producers.split(',');
    
                producer.map(async (prod) => {
                    if (prod.indexOf(" and ") === -1) {
                        // Caso não tenha o 'and' nos produtores
                        const alone = await movieRepository.allByWinnerAndProduces(prod)
                        producersFinish.push({
                            producer: prod,
                            count: alone.length,
                            movies: alone.filter((movi) => movi.winner === 'yes'),
                            order: 1
                        })

                    } else {
                        // Caso tenha o and nos produtores
                        const producerAnd = item.producers.split(' and ');
                        const aloneAnd = await movieRepository.allByWinnerAndProduces(producerAnd[1])
                        producersFinish.push({
                            producer: producerAnd[1],
                            count: aloneAnd.length,
                            movies: aloneAnd.filter((movi) => movi.winner === 'yes'),
                            order: 2
                        })
                    }
                })
            } else {
                if (item.producers.indexOf(" and ") === -1) {
                    // Caso não tenha o 'and' nos produtores
                    const alone = await movieRepository.allByWinnerAndProduces(item.producers)
                    producersFinish.push({
                        producer: item.producers,
                        count: alone.length,
                        movies: alone.filter((movi) => movi.winner === 'yes'),
                        order: 3
                    })
                } else {
                     // Caso tenha o and nos produtores
                     const producerAnd = item.producers.split(' and ');
                     producerAnd.map(async (and) => {
                         const aloneAnd = await movieRepository.allByWinnerAndProduces(and)
                         producersFinish.push({
                             producer: and,
                             count: aloneAnd.length,
                             movies: aloneAnd.filter((movi) => movi.winner === 'yes'),
                             order: 4
                         })
                     })
                }
               
            }
        })
        await Promise.all(resultProducer)

        const setProducer = new Set();
        const newProducerFinish = producersFinish.filter((finish) => {
            const duplicatedFinish = setProducer.has(finish.producer);
            setProducer.add(finish.producer);
            return !duplicatedFinish;
        });

        const onlyMoreOne = newProducerFinish.filter((producer) => producer.count > 1);
        
        const producerYearInterval = []
        const producerYearIntervalMaxAux = []
        const producerYearIntervalMinAux = []

        const yearProducer = onlyMoreOne.map((producer) => {

            let intervalAuxMin = 0
            for (let i = 0; i < producer.movies.length; i++) {
                for (let j = i+1; j < producer.movies.length; j++) {
                    let intervalAux = parseInt(producer.movies[i].year)-parseInt(producer.movies[j].year)

                    if (intervalAux < intervalAuxMin) {
                        intervalAuxMin = intervalAux
                        producerYearIntervalMinAux.push({
                            producer: producer.producer,
                            previousWin: producer.movies[i].year,
                            followingWin: producer.movies[j].year,
                            interval: Math.abs(intervalAux)
                        })

                        break;
                    }
                }
            }

            let intervalAuxMax = 0
            for (let i = 0; i < producer.movies.length; i++) {
                for (let j = i+1; j < producer.movies.length; j++) {
                    let intervalAux = parseInt(producer.movies[i].year)-parseInt(producer.movies[j].year)

                    if (intervalAux > intervalAuxMax) {
                        intervalAuxMax = intervalAux
                        producerYearIntervalMaxAux.push({
                            producer: producer.producer,
                            previousWin: producer.movies[i].year,
                            followingWin: producer.movies[j].year,
                            interval: Math.abs(intervalAux)
                        })

                        break;
                    }
                }
            }
           
        })
        await Promise.all(yearProducer)
        const finish = {
            min: producerYearIntervalMinAux.sort(function(a, b){return a.interval - b.interval;}),
            max: producerYearIntervalMaxAux.sort(function(a, b){return b.interval - a.interval;}),
        }
        
        return { 
            min: [producerYearIntervalMinAux.sort(function(a, b){return a.interval - b.interval;})[0]],
            max: [producerYearIntervalMaxAux.sort(function(a, b){return b.interval - a.interval;})[0]]
        };
    
    }

}

module.exports = new MovieService();