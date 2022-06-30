const assert = require("assert");

// insert new element in a collection -> INSERT/POST action
exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.insert(document);
};

// get all documents from a collection -> GET action
exports.findDocuments = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find({}).toArray();
};

// remove a document from a collection -> DELETE action
exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

// update a document in a collection -> PUT/PATCH action
exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};
