

const request = require('supertest');


const app = require('../../app');
const { connect } = require('../../config/db');
const movieRepository = require('./movie.repository');
let db = null
describe('Test Integration Location', () => {
  
  beforeAll(async () => {
    db = connect();
  });

  it('POST /api/movie - should return success', async () => {
   
    const res = await request(app).post("/api/movie").send({
      "title": "Movie 1",
      "studios": "Movies studios",
      "producers": "Fulano 1",
      "year": "2008",
      "winner": ""
  });
    expect(res.statusCode).toBe(201);
  });

  it('PUT /api/movie/:id - should return success', async () => {

    const insert = await movieRepository.insert({
        "title": "Movie 1",
        "studios": "Movies studios",
        "producers": "Fulano 1",
        "year": "2008",
        "winner": ""
      });
    
    
    const res = await request(app).put(`/api/movie/${insert._id}`).send({
      "winner": ""
  });
    expect(res.statusCode).toBe(200);
  });

  it('DELETE /api/movie/:id - should return success', async () => {
    const insert = await movieRepository.insert({
      "title": "Movie 1",
      "studios": "Movies studios",
      "producers": "Fulano 1",
      "year": "2008",
      "winner": ""
    });
    const res = await request(app).delete(`/api/movie/${insert._id}`).send();
    expect(res.statusCode).toBe(200);
  });
  
  it('GET /api/movie/all - should return success', async () => {
   
    const res = await request(app).get("/api/movie/all").send();
    expect(res.statusCode).toBe(200);
    expect(res.body.min[0].producer).toEqual("Joel Silver");
    expect(res.body.max[0].producer).toEqual("Joel Silver");
  });

});