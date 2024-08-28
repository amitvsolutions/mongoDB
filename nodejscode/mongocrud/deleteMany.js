// Import mongo client //
const { MongoClient } = require('mongodb')

// Import Database connection URI
const uri = require('./atlas_uri.js');

const client = new MongoClient(uri);

const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

const documentToDelete = {balance:{$lt: 100000}}


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
   let result = await accountsCollection.deleteMany(documentToDelete)
   result.deletedCount == 1
    ?console.log(`deleted ${result.deletedCount} documents`)
    :console.log("No documents deleted")
 } catch (err) {
   console.error(`Error deleting document: ${err}`)
 } finally {
   await client.close()
 }
}
 
main()