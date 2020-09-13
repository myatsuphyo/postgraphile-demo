const { makeAddPgTableConditionPlugin } = require('graphile-utils');

module.exports = makeAddPgTableConditionPlugin(
    "app",
    "person",
    "minAge",
    build => ({ description: 'Person with minimal age', type: build.graphql.GraphQLInt}),
    (value, helpers, build) => {
        const { sql } = helpers;
        return sql.fragment`age >= ${sql.value(value)}`
    }
)