require('dotenv').config();
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

const getAllProducts = async () => {
    const scanResult = await dynamo.scan({"TableName": process.env.DYNAMODB_PRODUCTS}).promise();    
    return scanResult;
}
const getStockInfo = async () => {
    const scanResult = await dynamo.scan({"TableName": process.env.DYNAMODB_STOCKS}).promise();    
    return scanResult;
}

exports.getProductsList = async (event) => {
    const products = await getAllProducts();
    const stocks = await getStockInfo();

    const data = products.Items.map(product => {
      const stock = stocks.Items.find(s => s.product_id == product.id);
      if (stock) {
          product.count = stock.count;
      }
      return product;
  });
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(data),
    };
    return response;
};