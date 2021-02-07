import { ApolloError } from "apollo-server-express";
import { QueryExternalTranslationArgs } from "src/generated/graphql";
const axios = require("axios");

export default async function (
  _: undefined,
  args: QueryExternalTranslationArgs
) {
  const client_id = process.env.PAPAGO_CLIENT_ID;
  const client_secret = process.env.PAPAGO_CLIENT_SCRETE;
  const api_url = "https://openapi.naver.com/v1/papago/n2mt";

  try {
    const result = await axios.post(
      api_url,
      {
        source: args.data.source,
        target: args.data.target,
        text: args.data.text,
      },
      {
        headers: {
          "X-Naver-Client-Id": client_id,
          "X-Naver-Client-Secret": client_secret,
        },
      }
    );
    return result.data.message.result;
  } catch (error) {
    console.log(error.response);
    return new ApolloError(
      error.response.data.errorMessage,
      error.response.data.errorCode
    );
  }
}
