import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/loginMock';
import app from '../../../src/app';
import { LoginPayload } from '../../../src/types/LoginPayload'

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('se ao passar o login e senha corretas retorna o token', async function () {
    const mockUser = UserModel.build(loginMock);
    sinon.stub(UserModel, 'findOne').resolves(mockUser);

    const body: LoginPayload = {
        username: "Eddie",
        password: "sortudo"
    }

    const httpResponse = await chai.request(app)
    .post('/login')
    .send(body);

    expect(httpResponse.status).to.equal(200);
  })

  it('se tentar o login incorretos retorna o message', async function () {
    const mockUser = UserModel.build(loginMock);
    sinon.stub(UserModel, 'findOne').resolves(undefined);

    const body: LoginPayload = {
        username: "Eddieeeeeee",
        password: "sortudo"
    }

    const httpResponse = await chai.request(app)
    .post('/login')
    .send(body);

    expect(httpResponse.status).to.equal(401);
  })

});
