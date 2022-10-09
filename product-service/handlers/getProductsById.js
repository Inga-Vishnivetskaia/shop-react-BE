'use strict';

let mock = require('../products-mock');

const getProduct = (id) => {
    const product = mock.products.find(product => product.productId == id);
    return product;
}

module.exports.getProductsById = async (event) => {

    const { productId } = event.pathParameters;
    const product = getProduct(productId);
    let body = product;
    let statusCode = 200;

    if(!product){
      statusCode = 404;
      body = 'This product is not available at the moment';
    }
    return {
      statusCode,
      body: JSON.stringify(body)
    };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
