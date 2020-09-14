const { makeQueryRunner } = require("./query_runner.js");

async function main() {
  const runner = await makeQueryRunner(
    "postgres:///sample_db",
    "app"
  );

  // create a new record
  const tableName = "person";
  const fristName = "Candle";
  const lastName = "Mic";
  const age = 30;
  const result = await runner.query(
    "mutation{ createPerson( input: { person:{ firstName:"+ JSON.stringify(fristName) + 
    ", lastName:"+ JSON.stringify(lastName) +", age:" + age + "}}) { "+ tableName +" {id}}}"
  );

  console.log(JSON.stringify(result, null, 2));
  await runner.release();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
