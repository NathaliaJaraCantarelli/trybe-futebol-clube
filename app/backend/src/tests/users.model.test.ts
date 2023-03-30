import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'
import modelUser from '../database/models/User';
import { allUsers } from './mocks/users.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a model de teams', () => {
  it('Retorna todos os tiimes', async () => {
    sinon.stub(modelUser, 'findAll').resolves(allUsers);

    const result: Response = await chai.request(app).get('/login');

    expect(result.status).to.be.equal(200);
    expect(result.body).to.be.deep.equal(allUsers);
  })
})
