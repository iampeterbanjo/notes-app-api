import AWS from "aws-sdk";

AWS.config.update({ region: "eu-west-1" });

export const call = (action, params) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  return dynamodb[action](params).promise();
}
