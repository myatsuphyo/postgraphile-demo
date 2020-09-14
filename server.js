// // app.mjs
// const express = require('express');
// const app = express();
// const port = 3000;


// app.get("/add", (req, res) => {
//     // query runner
//     const { makeQueryRunner } = require("./query_runner.js");
//     const runner = makeQueryRunner(
//         "postgres:///sample_db",
//         "app"
//     );

//     // create a new record
//     const tableName = "person";
//     const fristName = "Alec";
//     const lastName = "Holand";
//     const age = 25;
//     const result = runner.query(
//         "mutation{ createPerson( input: { person:{ firstName:"+ fristName + ", lastName:"+ lastName +", age:" + age + "}}) { "+ tableName +" {id}}}"
//     );

//     console.log(JSON.stringify(result, null, 2));
//     runner.release();
// });

// app.listen(port, () => console.log(`Example app listening on port port!`));