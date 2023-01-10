const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://kevinstewartmercurio:ri2SVriEjJFupxeT@clusterksm.ahcsbsm.mongodb.net/?";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function main() {
  try {
    await client.connect();
    
    // // searches through the comments collection in the sample_mflix database
    // // to find a document containing {name: Mercedes Tyler}
    // const database = client.db("sample_mflix");
    // const comments = database.collection("comments");
    // const query = {name: "Mercedes Tyler"};
    // const name = await comments.findOne(query);
    // console.log(name);


    // // insert a document into the messages collection in the enigma-chat-io
    // // database
    // const database = client.db("enigma-chat-io");
    // const dbMsgs = database.collection("messages");
    // const docs = [
    //     {name: "kevin", content: "hello, again, world"},
    //     {name: "isabelle", content: "i've had a thought"},
    //     {name: "susannah", content: "super mario"},
    //     {name: "maddie", content: "little susie's worker"},
    //     {name: "adam", content: "arizona"},
    //     {name: "shane", content: "eagles game tomorrow"},
    //     {name: "sumi", content: "just got back from japan"},
    //     {name: "adora", content: "climbing"},
    //     {name: "sidhika", content: "climbing for the first time"},
    //     {name: "jacob", content: "running late sorry"}
    // ]
    // const result = await dbMsgs.insertMany(docs);
    // console.log(`${result.insertedCount} documents inserted`);


    // // empty the messages collection
    // const database = client.db("enigma-chat-io");
    // const dbMsgs = database.collection("messages");
    // const result = await dbMsgs.deleteMany();
    // console.log(`deleted ${result.deletedCount} documents`);


    // // prints the first 5 documents in the messages collection
    // const database = client.db("enigma-chat-io");
    // const dbMsgs = database.collection("messages");
    // const options = {
    //     sort: {time: 1},
    //     projection: {_id: 0, name: 1, message: 1, time: 1}
    // };
    // const cursor = dbMsgs.find({}, options).limit(5);
    // let docsArr = [];
    // await cursor.forEach((msg) => docsArr.push(msg));
    // console.log(docsArr);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);