import { ApolloError } from "apollo-server-express";
import { QueryExternalTranslationArgs } from "src/generated/graphql";
const axios = require("axios");

export default async function (
  _: undefined,
  args: QueryExternalTranslationArgs
) {
  console.log(args.data);

  const client_id = "gJMyUBw9JyKAiajisVCw";
  const client_secret = "c1IIpF4C1Q";
  const api_url = "https://openapi.naver.com/v1/papago/n2mt";
  const options = {
    url: api_url,
    form: {
      source: args.data.source,
      target: args.data.target,
      text: args.data.text,
    },
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };

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
    return result.data;
  } catch (error) {
    console.log(error.response);
    return new ApolloError(
      error.response.data.errorMessage,
      error.response.data.errorCode
    );
  }
}
