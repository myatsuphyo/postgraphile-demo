const { Pool } = require("pg");
const { graphql } = require("graphql");
const { withPostGraphileContext, createPostGraphileSchema,} = require("postgraphile");

async function makeQueryRunner( connectionString, schemaName,options = {}) {
  // Create the PostGraphile schema 
  const schema = await createPostGraphileSchema(
    connectionString, 
    schemaName, 
    options
  );

  // Our database pool
  const pgPool = new Pool({
    connectionString,
  });

  // The query function for issuing GraphQL queries
  const query = async (
    graphqlQuery, // e.g. `{ __typename }`
    variables = {},
    jwtToken = null, // A string, or null
    operationName = null
  ) => {

    const request = { headers: {} };

    // pgSettings and additionalContextFromRequest cannot be functions at this point
    const pgSettings =
      typeof options.pgSettings === "function"
        ? options.pgSettings(request)
        : options.pgSettings;
    const additionalContextFromRequest =
      typeof options.additionalContextFromRequest === "function"
        ? options.additionalContextFromRequest(request)
        : options.additionalContextFromRequest;

    return await withPostGraphileContext(
      {
        ...options,
        pgPool,
        jwtToken: jwtToken,
        pgSettings,
      },
      async (context) => {
        return await graphql(
          schema,
          graphqlQuery,
          null,
          {
            ...context,
            ...additionalContextFromRequest,
          },
          variables,
          operationName
        );
      }
    );
  };

  // Should we need to release this query runner, the cleanup tasks:
  const release = () => {
    pgPool.end();
  };

  return {
    query,
    release,
  };
}

exports.makeQueryRunner = makeQueryRunner;
