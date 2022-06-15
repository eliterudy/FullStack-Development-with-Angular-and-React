const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
  assert.equal(err, null);
  console.log("Connnected correctly to server");

  const db = client.db(dbname);
  const dishCollection = db.collection("dishes");

  dishCollection.insertOne(
    { name: "Uthappizza", description: "test" },
    (err, result) => {
      assert.equal(err, null);

      console.log("After Insert:\n");
      console.log(result);

      dishCollection.find({}).toArray((err, docs) => {
        assert.equal(err, null);

        console.log("Found:\n");
        console.log(docs);

        db.dropCollection("dishes", (err, result) => {
          assert.equal(err, null);

          client.close();
        });
      });
    }
  );
});
