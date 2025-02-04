import { APIGatewayProxyResult } from "aws-lambda";

export const createResponse = (
  statusCode: number,
  body: any,
  cookies?: string[]
): APIGatewayProxyResult => {
  const response: APIGatewayProxyResult = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(body),
  };

  if (cookies) {
    response.multiValueHeaders = {
      "Set-Cookie": cookies,
    };
  }

  return response;
};
