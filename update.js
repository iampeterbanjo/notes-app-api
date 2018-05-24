import { dynamoDbLib, success, failure } from "./libs/index";

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const { attachment, content } = data;
  const params = {
    TableName: "notes",
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.request.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET content = :content, attachment = :attachment",
    ExpressionAttributeValues: {
      ":attachment": attachment ? attachment : null,
      ":content": content ? content : null
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("updates", params);
    callback(null, success({ status: true }));
  } catch (error) {
    callback(null, failure({ status: false, error }));
  }
}
