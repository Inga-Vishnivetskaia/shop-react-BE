'use strict';
require('dotenv').config();

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const getProduct = async ( param ) => {
  const response = await dynamo.query(param).promise();
  return response.Items;
}

const productsParams = {
  TableName: process.env.DYNAMODB_PRODUCTS,
  KeyConditionExpression: "id = :id",
}

module.exports.getProductsById = async (event) => {
    const { productId } = event.pathParameters;
    productsParams.ExpressionAttributeValues = {
      ":id": productId,
    }

    const product = await getProduct(productsParams);
    let body = product;
    let statusCode = 200;

    if(!product){
      statusCode = 404;
      body = 'This product is not available at the moment';
    }
    return {
      statusCode,      	
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(body)
      };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
