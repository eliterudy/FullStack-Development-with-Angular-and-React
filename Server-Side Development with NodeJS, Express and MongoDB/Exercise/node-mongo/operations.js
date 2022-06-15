const assert = require("assert");

// insert new element in a collection -> INSERT/POST action
exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.insert(document, (err, result) => {
    assert.equal(err, null);
    console.log(
      "Inserted " +
        JSON.stringify(result) +
        " documents into the collection " +
        collection
    );
    callback(result);
  });
};

// get all documents from a collection -> GET action
exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    callback(docs);
  });
};

// remove a document from a collection -> DELETE action
exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);
  coll.deleteOne(document, (err, result) => {
    assert.equal(err, null);
    console.log("Removed the document" + document);
    callback(result);
  });
};

// update a document in a collection -> PUT/PATCH action
exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);
  coll.updateOne(document, { $set: update }, null, (err, result) => {
    assert.equal(err, null);
    console.log("Updated the document with ", update);
    callback(result);
  });
};
