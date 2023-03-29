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
  it('Retorna todos os tiimes', async () => {
    sinon.stub(modelTeams, 'findAll').resolves(allTeams);

    const result: Response = await chai.request(app).get('/teams');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(allTeams);
  })
})