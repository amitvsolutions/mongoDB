// Import mongo client //
const { MongoClient } = require('mongodb')

// Import Database connection URI
const uri = require('./atlas_uri.js');

const client = new MongoClient(uri);

const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

const sampleAccount = {
 account_holder: "bacchan pandey",
 account_id: "MDB829001786",
 account_type: "savings",
 balance: 503524897,
}

const connectToDatabase = async () => {
    try{
        await client.connect();
        console.log(`connected to the ${dbname} database`)
    }catch(err){
        console.error(`Error connecting to the database: ${err}`)
    };
};

const main = async () => {
 try {
   await connectToDatabase()
   // insertOne method is used here to insert the sampleAccount document
   let result = await accountsCollection.insertOne(sampleAccount)
   console.log(`Inserted document: ${result.insertedId}`)
 } catch (err) {
   console.error(`Error inserting document: ${err}`)
 } finally {
   await client.close()
 }
}
 
main()