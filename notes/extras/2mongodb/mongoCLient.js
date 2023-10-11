let { MongoClient, ObjectId } = require("mongodb");

//connect db
let url = "mongodb://localhost:27017/new";
let client = new MongoClient(url);
let db = client.db("new");

//select collection
let testCollection = db.collection("test");

/* 
testCollection.insertOne({
    title: "Junaid",
    olala:" Juga buga",
    osama: 123
}).then(doc=>console.log(doc)).catch(err=>console.log("ERROR", err)); 
*/

/* 
testCollection.insertMany([
  {
    title: "Osama",
  },
  {
    title: "Moin",
  },
]).then(printResult).catch(printResult);
 */

// testCollection.findOne().then(printResult).catch(printResult);


// testCollection.deleteMany({title: "Moin"}).then(printResult).catch(printResult);

// testCollection.findOne({_id: new ObjectId("651460fd05fcab9b552f0f54")}).then(pr);
// testCollection.updateMany({}, {
    //     $set: {
//         title: "Hello wjjorld"+Math.round(Math.random()*100)
//     },
//     $inc : {
//         likes: -5
//     }
// }).then(pr);


//nested field
// testCollection.updateOne({_id: new ObjectId("651462182b7583281c51ea5e")}, {
//     $set: {
//         "address.city": "Tomato"
//     }
// }).then(pr);

//close the connection
setTimeout(()=>client.close(), 2000);

function pr(v) {
  console.log(v);
}

function printResult(v) {
  console.log(v);
}
