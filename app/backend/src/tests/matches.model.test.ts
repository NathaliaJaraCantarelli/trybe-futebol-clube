import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import modelMatches from '../database/models/Matches';
import modelUser from '../database/models/User';
import { allMatches, createMatch } from './mocks/matches.mock';
import { UserOne } from './mocks/users.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a model de teams', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Retorna todos os matches', async () => {
    sinon.stub(modelMatches, 'findAll').resolves(allMatches);

    const result: Response = (await chai
      .request(app)
      .get('/matches'));
    
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(allMatches);
  });

  it('Retorna todos os matches finalizados', async () => {
    sinon.stub(modelMatches, 'findAll').resolves(allMatches);

    const result: Response = (await chai
      .request(app)
      .get('/matches?inProgress=false'));
    
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal([allMatches[0]]);
  });

  it('Finaliza um match', async () => {
    sinon.stub(modelUser, 'findOne').resolves(UserOne[0]);
    sinon.stub(modelMatches, 'update').resolves();

    const token: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'admin1' }));

    const result: Response = (await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', token.body.token)); 
    
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal({ "message": "Finished" });
  });

  it('Atualiza um match', async () => {
    sinon.stub(modelUser, 'findOne').resolves(UserOne[0]);
    sinon.stub(modelMatches, 'update').resolves();

    const token: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'admin1' }));

    const result: Response = (await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', token.body.token)
      .send({ "homeTeamGoals": 3, "awayTeamGoals": 1 })); 
    
    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal({ "message": "updated" });
  });

  it('Cria um match', async () => {
    sinon.stub(modelUser, 'findOne').resolves(UserOne[0]);
    sinon.stub(modelMatches, 'findByPk').resolves(true as any);
    sinon.stub(modelMatches, 'create').resolves(createMatch as any);

    const token: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'admin1' }));

    const result: Response = (await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token.body.token)
      .send({
        "homeTeamId": 16,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })); 
    
    expect(result.status).to.be.equal(201);
    expect(result.body).to.be.deep.equal(createMatch);
  });

  it('Retorna um erro ao inserir um team que não existe', async () => {
    sinon.stub(modelUser, 'findOne').resolves(UserOne[0]);
    sinon.stub(modelMatches, 'findByPk').resolves(null);

    const token: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'admin1' }));

    const result: Response = (await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token.body.token)
      .send({
        "homeTeamId": 999,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })); 
    
    expect(result.status).to.be.equal(404);
    expect(result.body).to.be.deep.equal({ "message": "There is no team with such id!" });
  });

  it('Retorna um erro ao inserir um team que não existe', async () => {
    sinon.stub(modelUser, 'findOne').resolves(UserOne[0]);

    const token: Response = (await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'admin1' }));

    const result: Response = (await chai
      .request(app)
      .post('/matches')
      .set('Authorization', token.body.token)
      .send({
        "homeTeamId": 1,
        "awayTeamId": 1,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      })); 
    
    expect(result.status).to.be.equal(422);
    expect(result.body).to.be.deep.equal({ "message": "It is not possible to create a match with two equal teams" });
  });
});
