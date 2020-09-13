const { makeQueryRunner } = require("./query_runner.js");

async function main() {
  const runner = await makeQueryRunner(
    "postgres:///sample_db",
    "app"
  );

  const result = await runner.query(
    "mutation{ createPerson( input: { person:{ firstName:\"Dee\", lastName:\"Henz\", age:40}}) { person {id}}}"
  );

  console.log(JSON.stringify(result, null, 2));

  await runner.release();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
