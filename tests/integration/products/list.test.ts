import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import ProductModel from '../../../src/database/models/product.model';
import allProductsMock from '../../mocks/allProductsMock';
import app from '../../../src/app';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });

  it('se retorna todos os produtos com status correto', async function () {
    const mockProducts = ProductModel.bulkBuild(allProductsMock);
    sinon.stub(ProductModel, 'findAll').resolves(mockProducts);

    const httpResponse = await chai.request(app)
    .get('/products');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(allProductsMock);

  })

});
