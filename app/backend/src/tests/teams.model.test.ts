import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import modelTeams from '../database/models/Team';
import { allTeams } from './mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a model de teams', () => {
  afterEach(() => {
    sinon.restore();
  })

  it('Retorna todos os times', async () => {
    sinon.stub(modelTeams, 'findAll').resolves(allTeams);

    const result: Response = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(allTeams);
  })

  it('Retorna um time pelo id', async () => {
    sinon.stub(modelTeams, 'findByPk').resolves(allTeams[0]);

    const result: Response = await chai.request(app).get('/teams/1');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(allTeams[0]);
  })
})